//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MammacookedWebAPi
{
    using System;
    using System.Collections.Generic;
    
    public partial class FoodGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FoodGroup()
        {
            this.ItemsGroups = new HashSet<ItemsGroup>();
        }
    
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string GroupDetails { get; set; }
        public Nullable<bool> DeleteFlag { get; set; }
        public Nullable<bool> OfferFlag { get; set; }
        public string Image { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ItemsGroup> ItemsGroups { get; set; }
    }
}