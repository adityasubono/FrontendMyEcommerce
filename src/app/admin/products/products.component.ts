import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {productModel} from '../../model/product.model';


declare var $;
declare var toastr;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: productModel[];
  SelectedImage: File = null;
  tempID = '';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.AllProducts
      .subscribe(res => {

        this.products = res;
        // console.log(this.products);
      });
  }

  search(input) {
    this.productService.getFromDb(input);
  }

  onSelect(event) {
    // tslint:disable-next-line:prefer-const
    let tempath = URL.createObjectURL(event.target.files[0]);
    $('#AddEmpImage').fadeIn('fast').attr('src', tempath);
    this.SelectedImage = event.target.files[0] as File;
  }

  add() {
    let message;
    const fd = new FormData();
    fd.append('image', this.SelectedImage);
    fd.append('name', $('#name').val());
    fd.append('category', $('#category').val());
    fd.append('brand', $('#brand').val());
    fd.append('price', $('#price').val());
    fd.append('desc', $('#desc').val());
    this.productService.add(fd).subscribe(
      res => {
        message = res;
        toastr.success(message.message);
        this.productService.getFromDb('');
      },
      error => {
        // tslint:disable-next-line:no-shadowed-variable
        error.error.error.forEach(element => {
          toastr.error('Required', element);
        });
      }
    );
  }

  selectForUpdate(id) {
    this.tempID = id;
    this.products.forEach(el => {
      if (id === el.id) {
        $('#uname').prop('value', el.name);
        $('#oldcategory').prop('value', el.category);
        $('#oldcategory').html(el.category);
        $('#oldbrand').prop('value', el.brand);
        $('#oldbrand').html(el.brand);
        $('#uprice').prop('value', el.price);
        $('#udesc').prop('value', el.desc);
      }
    });
  }

  update() {

    let message;
    const fd = new FormData();
    fd.append('id', this.tempID);
    fd.append('name', $('#uname').val());
    fd.append('category', $('#ucategory').val());
    fd.append('brand', $('#ubrand').val());
    fd.append('price', $('#uprice').val());
    fd.append('desc', $('#udesc').val());
    this.productService.update(fd).subscribe(
      res => {
        message = res;
        toastr.success(message.message);
        this.productService.getFromDb('');
      },
      error => {
        // tslint:disable-next-line:no-shadowed-variable
        error.error.error.forEach(element => {
          toastr.error('Required', element);
        });
      }
    );
  }

  selectForShow(id) {
    this.tempID = id;
    this.products.forEach(el => {
      if (id === el.id) {
        $('#sname').prop('value', el.name);
        // $('#sEmpImage').prop('value', el.sEmpImage);
        $('#scategory').prop('value', el.category);
        $('#oldcategory').prop('value', el.category);
        $('#sbrand').prop('value', el.brand);
        $('#oldbrand').prop('value', el.brand);
        $('#sprice').prop('value', el.price);
        $('#sdesc').prop('value', el.desc);
      }
    });
  }

  selectForDelete(id) {
    this.tempID = id;
  }

  deleteConform() {
    let message;
    this.productService.delete(this.tempID).subscribe(
      res => {
        message = res;
        toastr.success(message.message);
        this.productService.getFromDb('');
      },
      error => {
        // tslint:disable-next-line:no-shadowed-variable
        error.error.error.forEach(element => {
          toastr.error('Required', element);
        });
      }
    );
  }

}
