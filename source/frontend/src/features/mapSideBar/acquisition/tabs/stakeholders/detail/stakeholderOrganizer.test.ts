import { waitFor } from '@testing-library/react';

import { InterestHolderType } from '@/constants/interestHolderTypes';
import { mockAcquisitionFileResponse } from '@/mocks/acquisitionFiles.mock';
import { emptyApiInterestHolder, emptyInterestHolderProperty } from '@/mocks/interestHolder.mock';
import { getMockApiInterestHolders } from '@/mocks/interestHolders.mock';
import { Api_InterestHolder } from '@/models/api/InterestHolder';

import StakeholderOrganizer from './stakeholderOrganizer';

describe('StakeholderOrganizer', () => {
  it('groups multiple interest holder properties by acquisition file id', async () => {
    const acquisitionFile = mockAcquisitionFileResponse();
    const interestHolders = getMockApiInterestHolders();

    const organizer = new StakeholderOrganizer(acquisitionFile, interestHolders);

    const groupedProperties = organizer.getInterestProperties();

    expect(groupedProperties).toHaveLength(2);
    expect(groupedProperties[0].groupedPropertyInterests).toHaveLength(2);
  });

  it('does not group interest and non-interests for the same property', async () => {
    const acquisitionFile = mockAcquisitionFileResponse();

    const testInterestHolders: Api_InterestHolder[] = [
      {
        ...emptyApiInterestHolder,
        interestHolderProperties: [
          {
            ...emptyInterestHolderProperty,
            propertyInterestTypes: [{ id: 'NIP' }],
            acquisitionFilePropertyId: 1,
          },
        ],
      },
      {
        ...emptyApiInterestHolder,
        interestHolderProperties: [
          {
            ...emptyInterestHolderProperty,
            propertyInterestTypes: [{ id: 'IP' }],
            acquisitionFilePropertyId: 1,
          },
        ],
      },
    ];

    const organizer = new StakeholderOrganizer(acquisitionFile, testInterestHolders);

    const interestProperties = organizer.getInterestProperties();
    const nonInterestProperties = organizer.getInterestProperties();

    await waitFor(async () => {
      expect(interestProperties).toHaveLength(1);
      expect(nonInterestProperties).toHaveLength(1);
    });
  });

  it('does not group interest holders for different properties interest types', async () => {
    const acquisitionFile = mockAcquisitionFileResponse();

    const testInterestHolders: Api_InterestHolder[] = [
      {
        ...emptyApiInterestHolder,
        personId: 1,
        interestHolderType: { id: InterestHolderType.INTEREST_HOLDER },
        interestHolderProperties: [
          {
            ...emptyInterestHolderProperty,
            acquisitionFilePropertyId: 1,
            propertyInterestTypes: [{ id: 'test_interest_1' }],
          },
        ],
      },
      {
        ...emptyApiInterestHolder,
        personId: 1,
        interestHolderType: { id: InterestHolderType.INTEREST_HOLDER },
        interestHolderProperties: [
          {
            ...emptyInterestHolderProperty,
            acquisitionFilePropertyId: 2,
            propertyInterestTypes: [{ id: 'test_interest_2' }],
          },
        ],
      },
    ];

    const organizer = new StakeholderOrganizer(acquisitionFile, testInterestHolders);

    const interestProperties = organizer.getInterestProperties();
    const nonInterestProperties = organizer.getInterestProperties();

    expect(interestProperties).toHaveLength(2);
    expect(nonInterestProperties[0].groupedPropertyInterests).toHaveLength(1);
  });

  it('it separates non-interest and interest payees even if they are for the same interest holder property', async () => {
    const acquisitionFile = mockAcquisitionFileResponse();

    const testInterestHolders: Api_InterestHolder[] = [
      {
        ...emptyApiInterestHolder,
        personId: 1,
        interestHolderType: { id: InterestHolderType.INTEREST_HOLDER },
        interestHolderProperties: [
          {
            ...emptyInterestHolderProperty,
            acquisitionFilePropertyId: 1,
            propertyInterestTypes: [{ id: 'test_interest_1' }, { id: 'NIP' }],
          },
        ],
      },
    ];

    const organizer = new StakeholderOrganizer(acquisitionFile, testInterestHolders);

    const interestProperties = organizer.getInterestProperties();
    const nonInterestProperties = organizer.getInterestProperties();

    await waitFor(async () => {
      expect(interestProperties).toHaveLength(1);
      expect(interestProperties[0].groupedPropertyInterests).toHaveLength(1);
      expect(nonInterestProperties).toHaveLength(1);
      expect(nonInterestProperties[0].groupedPropertyInterests).toHaveLength(1);
    });
  });
});