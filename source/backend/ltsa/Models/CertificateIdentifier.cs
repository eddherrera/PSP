/* 
 * Title Direct Search Services
 *
 * Title Direct Search Services
 *
 * OpenAPI spec version: 4.0.1
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System.IO;
using System.Runtime.Serialization;


namespace Pims.Ltsa.Models
{
    /// <summary>
    /// CertificateIdentifier
    /// </summary>
    [DataContract]
    public partial class CertificateIdentifier
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CertificateIdentifier" /> class.
        /// </summary>
        /// <param name="documentNumber">Certificate Number (required).</param>
        /// <param name="documentDistrictCode">documentDistrictCode (required).</param>
        public CertificateIdentifier(string documentNumber = default, LandTitleDistrictCode documentDistrictCode = default)
        {
            // to ensure "documentNumber" is required (not null)
            if (documentNumber == null)
            {
                throw new InvalidDataException("documentNumber is a required property for CertificateIdentifier and cannot be null");
            }
            else
            {
                this.DocumentNumber = documentNumber;
            }
            this.DocumentDistrictCode = documentDistrictCode;
        }

        /// <summary>
        /// Certificate Number
        /// </summary>
        /// <value>Certificate Number</value>
        [DataMember(Name = "documentNumber", EmitDefaultValue = false)]
        public string DocumentNumber { get; set; }

        /// <summary>
        /// Gets or Sets DocumentDistrictCode
        /// </summary>
        [DataMember(Name = "documentDistrictCode", EmitDefaultValue = false)]
        public LandTitleDistrictCode DocumentDistrictCode { get; set; }
    }
}