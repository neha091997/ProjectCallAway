import { LightningElement } from 'lwc';
import userDetail from '@salesforce/apex/CallAwayEmergencyController.userDetail';
import getBookingDetails from '@salesforce/apex/CallAwayEmergencyController.getBookingDetails';
import uId from '@salesforce/user/Id';
const Bookingcolumns = [
    { label: 'Booking Id', fieldName: 'Name' },
    { label: 'Patient Name', fieldName: 'PatientName__c' },
    { label: 'Hospital', fieldName: 'HospitalName__c' },
    { label: 'Date and Time', fieldName: 'Date_and_Time__c' },
    { label: 'Amenity Type ', fieldName: 'Amenity_Type__c' },
    { label: 'Nurse', fieldName: 'NurseName__c' },
    { label: 'Wardboy', fieldName: 'WardBoyName__c' }
];
export default class CallawayBookingDashboard extends LightningElement {
    uId = uId;
    welcomeUser;
    Bookingcolumns = Bookingcolumns
    BookingDetails;
    connectedCallback() {
        this.getUserDetail()
        this.getBooking()
    }
    getUserDetail() {
        userDetail({ Uid: this.uId })
            .then((result) => {
                this.welcomeUser = 'Hello ' + result
            }).catch((err) => {

            });
    }
    getBooking() {
        window.alert('Booking Called')
        getBookingDetails({ Uid: this.uId })
            .then((result) => {
                this.BookingDetails = result;
                window.alert(this.BookingDetails)
            }).catch((err) => {

            });
    }

}