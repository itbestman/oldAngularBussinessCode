using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace MammacookedWebAPi.ContractModels
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Order, OrderModel>();
        }
    }
}