import { AddressSummary } from './../../models/customer/address/AddressSummary';
import { AddressRequest } from './../../models/customer/address/AddressRequest';
import { DistrictRequest } from './../../models/customer/address/DistrictRequest';
import { CityResponse } from './../../models/customer/address/CityResponse';
import { AddressService } from './../../services/customer-service/address.service';
import { CityRequest } from './../../models/customer/address/CityRequest';
import { Component, Input, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators,ReactiveFormsModule, NgForm } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';;
import { Observable } from 'rxjs';
import { NeighbourhoodRequest } from '../../models/customer/address/NeighbourhoodRequest';
import { AddressResponse } from '../../models/customer/address/AddressResponse';
import { CustomerIdService } from '../../services/customer-service/customer-id.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [
    PopupComponent,
    ButtonComponent,
    RadioButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})

export class AddressInfoComponent implements OnInit{
  showModal: boolean = false;
  showExitPopup: boolean = false;
  addresses: AddressResponse[] = []; // Adresleri saklamak için dizi
  addressForm : FormGroup;
  currentCustomerId! : number; 
  addressSummary: AddressSummary[] = []


  constructor(private formBuilder : FormBuilder, private addressService: AddressService,private customerIdService : CustomerIdService, private router : Router)
  {
    this.addressForm = this.formBuilder.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      district: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      houseFlat: ['', [Validators.required, Validators.minLength(2)]],
      neighbourhood: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]]
    })
    this.currentCustomerId = this.customerIdService.customerId;
  }

  selectedOption: string = 'all';

  options = [{ label: 'Primary Address', value: 'all' }];


  ngOnInit(): void {
  this.getAllAddresses();
  console.log(this.addresses)

  }
 
  handleButtonClick() {
    this.showExitPopup = true;
  }

  //popup açılması
  openModal() {
    this.showModal = true;
 
  }

  //sayfa ilk açıldığında ve her veri eklendiğinde tekrardan veri çekecek.
  getAllAddresses(){
    this.addressService.getAllAddressByCustomerId(this.currentCustomerId).subscribe({
      next: (response : AddressResponse[]) => {
          this.addresses = response;
          
      }
    })
  }

  //popup kapanması
  closeModal() {
    this.showModal = false;
    this.showExitPopup = false;
    this.addressForm.reset()
  }

  //addresin savelenmesi
  saveAddress() {
    if(this.addressForm.valid){
      console.log("success")
      this.createAddressInit();
    }

  }
  nextComponent(){
    if(this.addresses.length!=0){
      this.router.navigate(['/customer-update']);
    }
    
  }


  //form valide mi kotnrolü
  onSubmit(form: NgForm) {
    // Tüm alanlar doluysa ve form geçerliyse adresi kaydet
    if (form.valid) {
      this.saveAddress();
      
    }
  }

  goToSearch() {
    this.router.navigate(['/customer-search']);
  }


  // city oluşumunun başlaması için ilk fonksiyon
  createAddressInit(){
    const cityRequest :CityRequest= {
      name : this.addressForm.get('city')?.value
    }
    this.createAddress(cityRequest);
  }

  //sırayla city-district-neighbourhood-address createleme
  createAddress(cityRequest : CityRequest)  {
    this.addressService.createCity(cityRequest).subscribe({
      next: (response) => {
        const districtRequest : DistrictRequest ={
          name: this.addressForm.get('district')?.value,
          cityId: response.cityId
        }
        this.addressService.createDistrict(districtRequest).subscribe({
          next:(response) => {
            const neighbourhoodRequest: NeighbourhoodRequest = {
              name: this.addressForm.get('neighbourhood')?.value,
              districtId: response.id
            }
            this.addressService.createNeighbourhood(neighbourhoodRequest).subscribe({
              next: (response) => {
                const addressRequest : AddressRequest = {
                  customerId:this.currentCustomerId,
                  neighbourhoodId: response.id,
                  addressName:'-',
                  addressDesc:this.addressForm.get('description')?.value,
                  street:this.addressForm.get('street')?.value,
                  houseNumber:this.addressForm.get('houseFlat')?.value
                }
                this.addressService.createAddress(addressRequest).subscribe({
                  next:(response) => {
                    console.log(response)
                    this.closeModal()
                    this.getAllAddresses()
                  }
                })
              }
            })
          }
        })
        

      }
    })
  }
  
}
