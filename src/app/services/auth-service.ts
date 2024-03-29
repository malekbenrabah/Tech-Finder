import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';

export interface AuthConfig {
  redirectUrlLogin: string;
  redirectUrlLogout: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keycloak = inject(KeycloakService);

  constructor(private router:Router) {
    this.keycloak.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.keycloak.getKeycloakInstance().loadUserProfile();
      }
    });
  }

  public logout(): void {
    this.keycloak.logout('http://localhost:4200/').then();
  }

  login() {
    return this.keycloak
      .login({ redirectUri: "http://localhost:4200" })
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    return this.keycloak.getKeycloakInstance()?.profile?.username as string;
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  getTokenExpirationDate(): number {
    return (
      this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number }
    )['exp'] as number;
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }

  isAuthenticated():any{
    return this.keycloak.getKeycloakInstance().authenticated;
  }

  userRole(){
    return this.keycloak.getUserRoles();
  }

}