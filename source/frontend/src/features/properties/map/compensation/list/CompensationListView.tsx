import { Section } from 'features/mapSideBar/tabs/Section';
import { SectionField } from 'features/mapSideBar/tabs/SectionField';
import { Api_Compensation, Api_CompensationFinancial } from 'models/api/Compensation';
import * as React from 'react';
import { formatMoney } from 'utils';

import { CompensationResults } from './CompensationResults';

export interface ICompensationListViewProps {
  compensations: Api_Compensation[];
  onDelete: (compensationId: number) => void;
}

export const CompensationListView: React.FunctionComponent<ICompensationListViewProps> = ({
  compensations,
  onDelete,
}) => {
  const fileCompensationTotal = compensations
    .filter(x => !x.isDraft)
    .reduce((fileTotal: number, current: Api_Compensation) => {
      const compensationTotal = current.financials.reduce(
        (financialTotal: number, financial: Api_CompensationFinancial) => {
          return financialTotal + (financial.totalAmount || 0);
        },
        0,
      );
      return fileTotal + compensationTotal;
    }, 0);
  return (
    <>
      <Section header="Compensation">
        <SectionField label={'Total compensation for this file'} labelWidth="9">
          {formatMoney(fileCompensationTotal)}
        </SectionField>
      </Section>
      <Section header="Requisitions in this file (H120)" isCollapsable initiallyExpanded>
        <CompensationResults
          results={compensations}
          onShow={(compensationId: number) => {
            // TODO;
          }}
          onDelete={onDelete}
        />
      </Section>
    </>
  );
};

export default CompensationListView;