using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelper
{
    public class PagedList<T> : List<T>
    {
         public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new Metadata
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPage = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }
        public Metadata MetaData { get; set; }

        public static async Task<PagedList<T>> ToPageList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var item = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(item,count,pageNumber,pageSize);
        }
    }
}