import { RenderOptions, waitFor } from '@testing-library/react';
import { useFormikContext } from 'formik';
import { createMemoryHistory } from 'history';
import { act } from 'react-test-renderer';

import { Claims } from '@/constants';
import { LeaseContextProvider } from '@/features/leases/context/LeaseContext';
import { LeaseFormModel } from '@/features/leases/models';
import { useApiContacts } from '@/hooks/pims-api/useApiContacts';
import { IContactSearchResult } from '@/interfaces';
import {
  getEmptyPerson,
  getMockContactOrganizationWithMultiplePeople,
  getMockContactOrganizationWithOnePerson,
} from '@/mocks/contacts.mock';
import { getMockApiLease } from '@/mocks/lease.mock';
import { mockLookups } from '@/mocks/lookups.mock';
import { getEmptyOrganization } from '@/mocks/organization.mock';
import { ApiGen_Concepts_Lease } from '@/models/api/generated/ApiGen_Concepts_Lease';
import { ApiGen_Concepts_LeaseStakeholder } from '@/models/api/generated/ApiGen_Concepts_LeaseStakeholder';
import { defaultApiLease, getEmptyBaseAudit } from '@/models/defaultInitializers';
import { lookupCodesSlice } from '@/store/slices/lookupCodes';
import { mockKeycloak, renderAsync } from '@/utils/test-utils';

import AddLeaseStakeholderContainer from './AddLeaseStakeholderContainer';
import { FormStakeholder } from './models';
import { IPrimaryContactWarningModalProps } from './PrimaryContactWarningModal';
import { createRef } from 'react';
import { useLeaseRepository } from '@/hooks/repositories/useLeaseRepository';
import { IAddLeaseStakeholderFormProps } from './AddLeaseStakeholderForm';
import { useLeaseStakeholderRepository } from '@/hooks/repositories/useLeaseStakeholderRepository';

// mock auth library

vi.mock('@/hooks/pims-api/useApiContacts');
vi.mock('@/features/leases/hooks/useUpdateLease');
vi.mock('@/hooks/repositories/useLeaseStakeholderRepository');
vi.mock('@/hooks/repositories/useLeaseRepository');

const getPersonConcept = vi.fn();
const updateTenants = vi.fn().mockResolvedValue({ ...defaultApiLease(), id: 1 });
const onEdit = vi.fn();
const onSuccess = vi.fn();

const history = createMemoryHistory();
const storeState = {
  [lookupCodesSlice.name]: { lookupCodes: mockLookups },
};

const SaveButton = () => {
  const { submitForm } = useFormikContext();
  return <button onClick={submitForm}>Save</button>;
};
let viewProps: IAddLeaseStakeholderFormProps & IPrimaryContactWarningModalProps;

const View = (props: IAddLeaseStakeholderFormProps & IPrimaryContactWarningModalProps) => {
  viewProps = props;
  return <></>;
};

const getLeaseTenantsObj = {
  execute: vi.fn().mockResolvedValue(defaultApiLease().stakeholders),
  loading: false,
  error: undefined,
  response: [],
};

const getLeaseTenantTypesObj = {
  execute: vi.fn().mockResolvedValue([]),
  loading: false,
  error: undefined,
  response: [],
};

describe('AddLeaseTenantContainer component', () => {
  const setup = async (
    renderOptions: RenderOptions & {
      lease?: ApiGen_Concepts_Lease;
      tenants?: FormStakeholder[];
    } = {},
  ) => {
    // render component under test
    const component = await renderAsync(
      <LeaseContextProvider initialLease={renderOptions.lease ?? { ...defaultApiLease(), id: 1 }}>
        <AddLeaseStakeholderContainer
          formikRef={createRef()}
          View={View}
          onEdit={onEdit}
          stakeholders={renderOptions.tenants ?? []}
          onSuccess={onSuccess}
          isPayableLease={false}
        >
          <SaveButton />
        </AddLeaseStakeholderContainer>
      </LeaseContextProvider>,
      {
        ...renderOptions,
        store: storeState,
        history,
      },
    );
    return { component };
  };

  beforeEach(() => {
    vi.resetAllMocks();
    mockKeycloak({ claims: [Claims.CONTACT_VIEW] });
    vi.mocked(useApiContacts).mockReturnValue({
      getPersonConcept: getPersonConcept,
    } as unknown as ReturnType<typeof useApiContacts>);
    vi.mocked(useLeaseStakeholderRepository).mockReturnValue({
      updateLeaseStakeholders: { execute: updateTenants.mockResolvedValue([]) },
      getLeaseStakeholders: getLeaseTenantsObj,
    } as unknown as ReturnType<typeof useLeaseStakeholderRepository>);
    vi.mocked(useLeaseRepository).mockReturnValue({
      getLeaseStakeholderTypes: getLeaseTenantTypesObj,
    } as unknown as ReturnType<typeof useLeaseRepository>);
  });

  it('renders as expected', async () => {
    const { component } = await setup({});

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('makes requests for primary contacts', async () => {
    await setup({});

    await act(async () => {
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithOnePerson()]);
    });
    expect(getPersonConcept).toHaveBeenCalledTimes(1);
    expect(viewProps.selectedStakeholders[0].organizationPersons).toHaveLength(1);
  });

  it('does not request duplicate person ids', async () => {
    await setup({});

    await waitFor(() => {
      viewProps.setSelectedStakeholders([
        getMockContactOrganizationWithOnePerson(),
        getMockContactOrganizationWithOnePerson(),
      ]);
      expect(getPersonConcept).toHaveBeenCalledTimes(1);
      expect(viewProps.selectedStakeholders[0].organizationPersons).toHaveLength(1);
    });
  });

  it('does not request previously requested data', async () => {
    await setup({});

    const contact: IContactSearchResult = {
      ...getMockContactOrganizationWithOnePerson(),
      organization: {
        ...getEmptyOrganization(),
        organizationPersons: [
          {
            id: 0,
            person: getEmptyPerson(),
            organizationId: 1,
            organization: null,
            personId: 2,
            rowVersion: null,
          },
        ],
      },
      person: undefined,
      personId: undefined,
      surname: undefined,
      firstName: undefined,
      middleNames: undefined,
    } as unknown as IContactSearchResult;

    await act(async () => {
      viewProps.setSelectedStakeholders([contact]);
    });
    expect(getPersonConcept).not.toHaveBeenCalled();
  });

  it('does not overwrite an existing primary contact if the selection does not change', async () => {
    await setup({});

    //setup
    await waitFor(() => {
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithOnePerson()]);
      expect(getPersonConcept).toHaveBeenCalledTimes(1);
      expect(viewProps.selectedStakeholders).toHaveLength(1);
    });

    await act(async () => {
      //act
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithOnePerson()]);
    });
    //assert
    expect(getPersonConcept).toHaveBeenCalledTimes(1);
  });

  it('sets a callback function when a tenant does not have a selected a primary contact', async () => {
    await setup({});

    await waitFor(() => {
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithMultiplePeople()]);
      expect(viewProps.selectedStakeholders).toHaveLength(1);
    });
    await act(async () => {
      viewProps.onSubmit({
        ...LeaseFormModel.fromApi(getMockApiLease()),
        stakeholders: viewProps.selectedStakeholders,
      });
    });
    expect(viewProps.saveCallback).not.toBeUndefined();
  });

  it('callback submits data with a valid empty primary contact', async () => {
    await setup({});

    await act(async () => {
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithMultiplePeople()]);
    });
    expect(viewProps.selectedStakeholders).toHaveLength(1);
    await act(async () => {
      viewProps.onSubmit({
        ...LeaseFormModel.fromApi(getMockApiLease()),
        stakeholders: viewProps.selectedStakeholders,
      });
    });
    await waitFor(() => {
      expect(viewProps.saveCallback).not.toBeUndefined();
    });

    viewProps.saveCallback && viewProps.saveCallback();
    await act(async () => {
      expect(updateTenants).toHaveBeenCalledTimes(1);
      expect(updateTenants.mock.calls[0][0].primaryContactId).toBeUndefined();
    });
  });

  it('onSubmit calls api with expected data', async () => {
    await setup({});
    await act(async () => {
      viewProps.onSubmit({ ...new LeaseFormModel(), id: 1 });
    });
    await waitFor(() => {
      expect(updateTenants).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(false);
    });
  });

  it('onSubmit calls api with expected data when a person with organization is populated', async () => {
    await setup({});
    viewProps.onSubmit({
      ...new LeaseFormModel(),
      stakeholders: [{ personId: 1, organizationId: 2 }],
      id: 1,
    });
    await waitFor(async () => {
      expect(updateTenants).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(false);
      expect(updateTenants.mock.calls[0][1][0]).toStrictEqual<ApiGen_Concepts_LeaseStakeholder>({
        personId: 1,
        person: null,
        organizationId: null,
        organization: null,
        lessorType: null,
        stakeholderTypeCode: null,
        primaryContactId: null,
        note: null,
        leaseId: 0,
        leaseStakeholderId: 0,
        primaryContact: null,
        ...getEmptyBaseAudit(),
      });
    });
  });

  it('onCancel removes the callback', async () => {
    await setup({});

    //setup
    await waitFor(() => {
      viewProps.setSelectedStakeholders([getMockContactOrganizationWithMultiplePeople()]);
      expect(viewProps.selectedStakeholders).toHaveLength(1);
      expect(viewProps.saveCallback).not.toBeNull();
    });
    //act
    act(() => viewProps.onCancel && viewProps.onCancel());
    //assert
    await waitFor(() => {
      expect(viewProps.saveCallback).toBeUndefined();
    });
  });
});