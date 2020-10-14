import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {productModel} from '../../model/product.model';

declare var $;
declare var toastr;
declare var Toastr;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: productModel[];
  SelectedImage: File = null;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.AllProducts
      .subscribe(res => {

      this.products = res;
      console.log(this.products);
    });
  }

  search(input) {
    this.productService.getFromDb(input);
  }

  onSelect(event) {
    // tslint:disable-next-line:prefer-const
    let tempath = URL.createObjectURL(event.target.files[0]);
    $('#AddEmpImage').fadeIn('fast').attr('src', tempath);
    this.SelectedImage = <File> event.target.files[0];
  }

}
