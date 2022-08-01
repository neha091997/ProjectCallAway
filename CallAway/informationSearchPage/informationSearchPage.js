import { LightningElement,wire } from 'lwc';
import getHospitals from '@salesforce/apex/CallAwayEmergencyController.getHospitals';
import 	Abulance_pic from '@salesforce/resourceUrl/Abulance_pic_1';
import 	hospital_pic from '@salesforce/resourceUrl/hospital_pic_1';
import 	appointmnt_pic from '@salesforce/resourceUrl/appointmnt_pic_1';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
const Hospitalcolumns = [
    { label: 'Hospital Name', fieldName: 'Name' },
    { label: 'City', fieldName: 'cities__c', type: 'url' },
    { label: 'General Bed', fieldName: 'General_Bed__c' },
    { label: 'Available Oxygen Cylinder ', fieldName: 'Oxygen_Cylinder__c' },
    { label: 'Available Non Ac Rooms', fieldName: 'Non_Ac_Room__c' },
    {type: 'button', typeAttributes: {
                label: 'Proceed',
                name: 'Proceed',
                title: 'Proceed',
                disabled: false,
                value: 'Id',
                iconPosition: 'left'
            }}
];
export default class InformationSearchPage extends NavigationMixin(LightningElement) {

 statevalue;
 cityvalue
 Hospitals;
 Hospitalcolumns = Hospitalcolumns
 getActive = true
 ShowData = false
 currentPageReference = null; 
    urlStateParameters = null;
 Abulance_pic_s = Abulance_pic;
     hospital_pic_s = hospital_pic;
     appointmnt_pic_s = appointmnt_pic;
    /* Params from Url */
    urlId = null;
    
 
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }
    setParametersBasedOnUrl() {
       this.urlId = this.urlStateParameters.recordId || null;
       
    }
 
    get stateoptions() {
        return [
            { label: '--None--', value: '' },
            { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
            { label: 'Maharashtra', value: 'Maharashtra' },
        ];
    }

    get cityoptions(){
       return [
            { label: 'Bhopal', value: 'Bhopal' },
            { label: 'Indore', value: 'Indore' },
            { label: 'Jabalpur', value: 'Jabalpur' },
        ];
    }
    

    handleChangeState(event) {
        this.statevalue = event.target.value;
        
    }
    handleChangeCity(event){
      this.cityvalue = event.target.value
      if(this.cityvalue != null){
        this.getActive = false;
      }else{
        this.getActive = true;
      }
    }
   

    handleSearchHospital(event){
     if(this.statevalue && this.cityvalue){
        
      event.preventDefault();
        getHospitals({ state: this.statevalue, city: this.cityvalue })
            .then((result) => {
               this.Hospitals = result
               this.ShowData = true
            
            })
}
    }
 
  callRowAction(event) {  
        
      const recId =  event.detail.row.Id;  
      this[NavigationMixin.Navigate]({
    type: 'standard__webPage',
    attributes: {
       url: '/hospitaldescription?HospitalId='+recId
    }
});


  }
     

slideIndex = 0;
//showSlides();

 showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


}
