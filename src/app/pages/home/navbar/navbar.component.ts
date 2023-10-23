import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { CartService } from 'src/app/cart-service.service';
import { AuthService } from 'src/app/services/auth-service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  visible = false;
  placement: NzDrawerPlacement = 'left';

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  userLoggedIn: boolean = false;

  user: any = null;
  cartItems: any = [];
  cartId: any = null;
  cartTotal: any = 0;
  isAdmin: boolean = false;

  // Subject for debouncing input changes
  private quantityInputSubject = new Subject<any>();

  // ViewChild for the input element
  @ViewChild('quantityInput') quantityInput: ElementRef | undefined;

  ngOnInit(): void {
    this.authService.isLoggedIn().then((res) => {
      this.userLoggedIn = res;
    });
    this.authService.getUserData().then((userData) => {
      this.user = userData;
      this.isAdmin = this.authService.userRole().includes('ADMIN');
      this.loadCart(this.user.sub);
    });

    this.checkScreenSize();

    // Subscribe to the quantityInputSubject for debouncing
    this.quantityInputSubject.pipe(debounceTime(500)).subscribe(() => {
      this.updateCartQuantity(this.editingCartItem);
    });
  }

  // Load the user's cart
  loadCart(userId: string): void {
    this.cartService.getCart(userId).subscribe(
      (cart: any) => {
        this.cartItems = cart.items;
        this.cartId = cart.id;
        this.cartTotal = this.calculateTotal();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Handle checkout
  checkout() {
    if (this.authenticated()) {
      this.cartService.checkout(this.user.sub).subscribe(
        (data: any) => {
          // Handle successful checkout
          console.log('Checkout successful');
          // Reload the user's cart
          this.loadCart(this.user.sub);
        },
        (error: any) => {
          console.error('Checkout failed', error);
        }
      );
    }
  }

  // Clear the user's cart
  clearCart() {
    if (this.authenticated()) {
      this.cartService.clearCart(this.user.sub).subscribe(
        () => {
          this.cartItems = [];
          this.cartTotal = 0;
        },
        (error: any) => {
          console.error('Clear cart failed', error);
        }
      );
    }
  }

  // Calculate the total price of items in the cart
  calculateTotal(): number {
    let total = 0;
    this.cartItems.forEach((item: any) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  // Logout and navigate to the home page
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  visibleCart = false;

  openCart(): void {
    this.visibleCart = true;
  }

  closecart(): void {
    this.visibleCart = false;
  }

  // Check if the user is authenticated
  authenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Handle the login action
  login() {
    this.authService.login();
  }

  // Handle the registration action
  register() {
    this.authService.register();
  }

  // Handle changes in screen size
  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // Check the screen size
  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  // Update cart item quantity
  editingCartItem: any;

  updateCartQuantity(item: any): void {
    // Update the quantity via your cart service
    this.cartService
      .updateCart(this.user.sub, item.product.id, item.quantity)
      .subscribe(
        (data: any) => {
          // Handle successful update
          console.log('Quantity updated successfully');
          this.loadCart(this.user.sub);
        },
        (error: any) => {
          console.error('Quantity update failed', error);
        }
      );
  }

  // Handle input changes
  onQuantityInputChange(item: any) {
    this.editingCartItem = item;
    if (this.quantityInput) {
      // Trigger the quantityInputSubject when the input value changes
      this.quantityInputSubject.next(this.quantityInput.nativeElement.value);
    }
  }
}
