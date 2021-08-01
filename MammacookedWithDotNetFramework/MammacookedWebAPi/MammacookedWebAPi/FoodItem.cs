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
    
    public partial class FoodItem
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FoodItem()
        {
            this.ItemsGroups = new HashSet<ItemsGroup>();
            this.OrderItems = new HashSet<OrderItem>();
            this.OrderItems1 = new HashSet<OrderItem1>();
        }
    
        public int Id { get; set; }
        public string Category { get; set; }
        public Nullable<System.TimeSpan> PreferredTime { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Prise { get; set; }
        public string RestrictedDays { get; set; }
        public string Details { get; set; }
        public string CountType { get; set; }
        public string Currency { get; set; }
        public string Image { get; set; }
        public Nullable<int> ServeGroup { get; set; }
        public Nullable<bool> DeleteFlag { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
        public string EditeBy { get; set; }
        public Nullable<System.DateTime> EditedOn { get; set; }
        public string DeleteBy { get; set; }
        public string DeleteOn { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ItemsGroup> ItemsGroups { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderItem1> OrderItems1 { get; set; }
    }
}
