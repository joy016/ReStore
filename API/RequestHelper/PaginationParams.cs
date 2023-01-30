using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelper
{
    public class PaginationParams
    {
        private const int maxPagesize = 50;
        public int pageNumber {get; set;} = 1;
        private int _pageSize = 6;

        public int pageSize {
            get => _pageSize;
            set => _pageSize = value > maxPagesize ? maxPagesize: value;
        }
    }
}