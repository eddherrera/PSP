using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using FluentAssertions;
using MapsterMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Pims.Api.Areas.Property.Models.Search;
using Pims.Api.Areas.PropertyOperation.Controllers;
using Pims.Api.Areas.Reports.Controllers;
using Pims.Api.Helpers.Constants;
using Pims.Api.Helpers.Exceptions;
using Pims.Api.Models.CodeTypes;
using Pims.Api.Models.Concepts.PropertyOperation;
using Pims.Api.Services;
using Pims.Core.Test;
using Pims.Dal;
using Pims.Dal.Entities;
using Pims.Dal.Entities.Models;
using Pims.Dal.Repositories;
using Pims.Dal.Security;
using Xunit;
using Entity = Pims.Dal.Entities;

namespace Pims.Api.Test.Controllers.PropertyOperation
{
    [Trait("category", "unit")]
    [Trait("category", "api")]
    [Trait("group", "propertyoperation")]
    [ExcludeFromCodeCoverage]
    public class PropertyOperationControllerTest
    {
        #region Variables

        private Mock<IPropertyOperationService> _service;
        private PropertyOperationController _controller;
        private IMapper _mapper;
        private TestHelper _helper;
        private Mock<ILookupRepository> _lookupRepository;
        private Mock<IWebHostEnvironment> _webHost;
        private Mock<Microsoft.AspNetCore.Http.IHeaderDictionary> _headers;
        #endregion

        public PropertyOperationControllerTest()
        {
            this._helper = new TestHelper();
            this._controller = this._helper.CreateController<PropertyOperationController>(Permissions.PropertyEdit);
            this._mapper = this._helper.GetService<IMapper>();
            this._lookupRepository = this._helper.GetService<Mock<ILookupRepository>>();
            this._webHost = this._helper.GetService<Mock<IWebHostEnvironment>>();
            this._headers = this._helper.GetService<Mock<Microsoft.AspNetCore.Http.IHeaderDictionary>>();
            this._service = this._helper.GetService<Mock<IPropertyOperationService>>();
        }

        #region Tests
        #region ExportProperties

        /// <summary>
        /// Mock a successful request with minimally valid models.
        /// </summary>
        [Fact]
        public void RunPropertyOperations_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<PropertyOperationController>(Permissions.PropertyEdit);
            IEnumerable<PropertyOperationModel> pimsPropertyOperations = new List<PropertyOperationModel>()
            {
                new PropertyOperationModel() { PropertyOperationTypeCode = new Models.Base.CodeTypeModel<string>() { Id = PropertyOperationTypes.SUBDIVIDE.ToString() }, PropertyOperationNo = 1 },
                new PropertyOperationModel() { PropertyOperationTypeCode = new Models.Base.CodeTypeModel<string>() { Id = PropertyOperationTypes.SUBDIVIDE.ToString() }, PropertyOperationNo = 1 },
            };


            var service = helper.GetService<Mock<IPropertyOperationService>>();

            // Act
            controller.RunPropertyOperations(pimsPropertyOperations);

            // Assert
            service.Verify(m => m.SubdivideProperty(It.IsAny<IEnumerable<PimsPropertyOperation>>()), Times.Once());
        }

        /// <summary>
        /// Mock a successful request with minimally valid models.
        /// </summary>
        [Fact]
        public void RunPropertyOperations_Fail_Empty()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<PropertyOperationController>(Permissions.PropertyEdit);
            IEnumerable<PropertyOperationModel> pimsPropertyOperations = new List<PropertyOperationModel>(){};


            var service = helper.GetService<Mock<IPropertyOperationService>>();

            // Act
            BadRequestObjectResult action = (BadRequestObjectResult) controller.RunPropertyOperations(pimsPropertyOperations);

            // Assert
            action.StatusCode.Should().Be(400);
            action.Value.Should().Be("No property operations were sent.");
        }

        /// <summary>
        /// Mock a successful request with minimally valid models.
        /// </summary>
        [Fact]
        public void RunPropertyOperations_Fail_InvalidType()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<PropertyOperationController>(Permissions.PropertyEdit);
            IEnumerable<PropertyOperationModel> pimsPropertyOperations = new List<PropertyOperationModel>() {
                new PropertyOperationModel() { PropertyOperationTypeCode = new Models.Base.CodeTypeModel<string>() { Id = "INVALID" }, PropertyOperationNo = 1 },
            };


            var service = helper.GetService<Mock<IPropertyOperationService>>();

            // Act
            BadRequestObjectResult action = (BadRequestObjectResult)controller.RunPropertyOperations(pimsPropertyOperations);

            // Assert
            action.StatusCode.Should().Be(400);
            action.Value.Should().Be("Unsupported property operation type code.");
        }
        #endregion
        #endregion
    }
}