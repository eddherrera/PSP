using System;
using Mapster;
using Pims.Api.Models.Base;
using Pims.Core.Extensions;
using static Pims.Dal.Entities.PimsLeasePeriodStatusType;
using Entity = Pims.Dal.Entities;

namespace Pims.Api.Models.Concepts.Lease
{
    public class LeasePeriodMap : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Entity.PimsLeasePeriod, LeasePeriodModel>()
                .Map(dest => dest.Id, src => src.LeasePeriodId)
                .Map(dest => dest.LeaseId, src => src.LeaseId)
                .Map(dest => dest.RenewalDate, src => src.PeriodRenewalDate.ToNullableDateOnly())
                .Map(dest => dest.ExpiryDate, src => src.PeriodExpiryDate.ToNullableDateOnly())
                .Map(dest => dest.StartDate, src => DateOnly.FromDateTime(src.PeriodStartDate))
                .Map(dest => dest.StatusTypeCode, src => src.LeasePeriodStatusTypeCodeNavigation)
                .Map(dest => dest.LeasePmtFreqTypeCode, src => src.LeasePmtFreqTypeCodeNavigation)
                .Map(dest => dest.IsGstEligible, src => src.IsGstEligible)
                .Map(dest => dest.IsTermExercised, src => src.LeasePeriodStatusTypeCode == LeasePeriodStatusTypes.EXER)
                .Map(dest => dest.GstAmount, src => src.IsGstEligible.HasValue && src.IsGstEligible.Value ? src.GstAmount : null)
                .Map(dest => dest.PaymentAmount, src => src.PaymentAmount)
                .Map(dest => dest.PaymentNote, src => src.PaymentNote)
                .Map(dest => dest.PaymentDueDateStr, src => src.PaymentDueDate)
                .Map(dest => dest.Payments, src => src.PimsLeasePayments)
                .Map(dest => dest.IsFlexible, src => src.PeriodDuration)
                .Map(dest => dest.IsVariable, src => src.PaymentType)
                .Inherits<Entity.IBaseAppEntity, BaseAuditModel>();

            config.NewConfig<LeasePeriodModel, Entity.PimsLeasePeriod>()
                .Map(dest => dest.LeasePeriodId, src => src.Id)
                .Map(dest => dest.LeaseId, src => src.LeaseId)
                .Map(dest => dest.PeriodRenewalDate, src => src.RenewalDate.ToNullableDateTime())
                .Map(dest => dest.PeriodExpiryDate, src => src.ExpiryDate.ToNullableDateTime())
                .Map(dest => dest.PeriodStartDate, src => src.StartDate.ToNullableDateTime())
                .Map(dest => dest.LeasePeriodStatusTypeCode, src => src.StatusTypeCode != null ? src.StatusTypeCode.Id : null)
                .Map(dest => dest.LeasePmtFreqTypeCode, src => src.LeasePmtFreqTypeCode != null ? src.LeasePmtFreqTypeCode.Id : null)
                .Map(dest => dest.IsGstEligible, src => src.IsGstEligible)
                .Map(dest => dest.IsPeriodExercised, src => src.LeasePmtFreqTypeCode != null && src.StatusTypeCode.Id == LeasePeriodStatusTypes.EXER)
                .Map(dest => dest.GstAmount, src => src.IsGstEligible ? src.GstAmount : null)
                .Map(dest => dest.PaymentAmount, src => src.PaymentAmount)
                .Map(dest => dest.PaymentNote, src => src.PaymentNote)
                .Map(dest => dest.PaymentDueDate, src => src.PaymentDueDateStr)
                .Map(dest => dest.PimsLeasePayments, src => src.Payments)
                .Map(dest => dest.PeriodDuration, src => src.IsFlexible)
                .Map(dest => dest.PaymentType, src => src.IsVariable)
                .Inherits<BaseAuditModel, Entity.IBaseAppEntity>();
        }
    }
}