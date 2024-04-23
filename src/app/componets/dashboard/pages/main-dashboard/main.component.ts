import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../services/auth.service';
import { UserStoreService } from '../../../../services/user-store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TitleServiceService } from '../../../../services/title-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainDashboardComponent implements OnInit {
  currentPageRole: number = 1;
  rolesPerPage: number = 5; 
  public users: any = [];
  roles: any[] = [];
  titles: any[] = []; // Assuming you have an array of titles
  currentPage: number = 1;
  titlesPerPage: number = 5; // Number of titles to display per page
  public fullName: string = '';
  public searchtext: string = '';
  public role!: string;
  titleForm!: FormGroup;
  RoleForm!: FormGroup;
  selectedTitleId: number | null = null;
  selectedRoleId: number | null = null;
  searchTitle: string = '';
  get totalTitles(): number {
    return this.titles.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalTitles / this.titlesPerPage);
  }

  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getDisplayedTitles(): any[] {
    const startIndex = (this.currentPage - 1) * this.titlesPerPage;
    const endIndex = Math.min(startIndex + this.titlesPerPage, this.totalTitles);
    return this.titles.slice(startIndex, endIndex);
  }
  
  changePageRole(page: number): void {
    this.currentPageRole = page;
  }
  
  nextPageRole(): void {
    if (this.currentPageRole < this.totalPagesRole) {
      this.currentPageRole++;
    }
  }
  
  prevPageRole(): void {
    if (this.currentPageRole > 1) {
      this.currentPageRole--;
    }
  }
  
  getDisplayedRoles(): any[] {
    const startIndex = (this.currentPageRole - 1) * this.rolesPerPage;
    const endIndex = Math.min(startIndex + this.rolesPerPage, this.roles.length);
    return this.roles.slice(startIndex, endIndex);
  }
  
  get totalRoles(): number {
    return this.roles.length;
  }
  
  get totalPagesRole(): number {
    return Math.ceil(this.totalRoles / this.rolesPerPage);
  }
  
  get pagesRole(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPagesRole; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private titleService: TitleServiceService,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.titleForm = this.fb.group({
      Name_Title: ['', Validators.required],
    });
    this.RoleForm= this.fb.group({
      Name_Role: ['', Validators.required],
    });
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.titleService.getAllTitle().subscribe((res) => {
      this.titles = res;
    });
    this.roleService.getAllRoles().subscribe((res)=>{
      this.roles=res;
  });
  
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
 
  onSaveTitle() {
    if (this.titleForm.valid) {
        this.titleService.saveTitle(this.titleForm.value).subscribe({
            next: (res) => {
                Swal.fire('Success', res.message, 'success');
                this.titleForm.reset();
                this.updateTitles(); // Call method to update titles array
                // Call selectTitle with the ID of the newly added title
                this.selectTitle(res.id); // Assuming res.id contains the ID of the saved title
            },
            error: (err) => {
                console.error('Error:', err);
                Swal.fire(
                    'Error',
                    'An error occurred while saving the title',
                    'error'
                );
            },
        });
    } else {
        // Show validation error if form is invalid
        Swal.fire('Error', 'Please provide a valid title', 'warning');
    }
}


  updateTitles() {
    // Refresh titles array by fetching all titles again
    this.titleService.getAllTitle().subscribe((res) => {
      this.titles = res;
    });
  }
  updateRoles() {
    // Refresh titles array by fetching all titles again
    this.roleService.getAllRoles().subscribe((res) => {
      this.roles = res;
    });
  }
  deleteTitle(id: number) {
    
      this.titleService.deleteTitle(id).subscribe({
        next: (res) => {
          Swal.fire('Success', 'Title deleted successfully', 'success');
          this.updateTitles(); // Refresh titles array
        },
        error: (err) => {
          console.error('Error:', err);
          Swal.fire('Error', 'An error occurred while deleting the title', 'error');
        },
      });
    
  }


// Method to set the selected title id
selectTitle(id: number) {
  this.selectedTitleId = id;
  // Fetch title details by ID and update the form
  this.titleService.getTitleById(id).subscribe((title) => {
      this.titleForm.patchValue({
          Name_Title: title.name_Title
          // Add other form fields if needed
      });
  });
}


onUpdateTitle() {
    if (this.titleForm.valid && this.selectedTitleId !== null) { // Check if a title is selected
        this.titleService.updateTitle(this.selectedTitleId, this.titleForm.value).subscribe({
            next: (res) => {
                Swal.fire('Success', res.message, 'success');
                this.titleForm.reset();
                this.updateTitles(); // Call method to update titles array
            },
            error: (err) => {
                console.error('Error:', err);
                Swal.fire('Error', 'An error occurred while updating the title', 'error');
            },
        });
    } else {
        // Show error if no title is selected or form is invalid
        Swal.fire('Error', 'Please select a title and provide valid information', 'warning');
    }
}



//   Role


selectRole(id: number) {
  this.selectedRoleId = id; // Corrected assignment
  // Fetch role details by ID and update the form
  this.roleService.getRoleById(id).subscribe((role) => {
    this.RoleForm.patchValue({
      Name_Role: role.name_Role
    });
  });
}


onSaveRole() {
  if (this.RoleForm.valid) {
    this.roleService.addRole(this.RoleForm.value).subscribe({
      next: (res) => {
        Swal.fire('Success', res.message, 'success');
        
        this.RoleForm.reset();
        
        
       this.updateRoles();
        this.selectRole(res.id); 
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'An error occurred while saving the role', 'error');
      }
    });
  } else {
    Swal.fire('Error', 'Please provide valid role information', 'warning');
  }
}


// Inside MainDashboardComponent

onUpdateRole() {
  if (this.RoleForm.valid && this.selectedRoleId !== null) {
    this.roleService.updateRole(this.selectedRoleId, this.RoleForm.value).subscribe({
      next: (res) => {
        Swal.fire('Success', res.message, 'success');
        this.RoleForm.reset();
        this.updateRoles(); // Call method to update roles array
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'An error occurred while updating the role', 'error');
      },
    });
  } else {
    Swal.fire('Error', 'Please select a role and provide valid information', 'warning');
  }
}

deleteRole(id: number) {
  if (id !== null) {
    this.roleService.deleteRole(id).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Role deleted successfully', 'success');
        this.updateRoles(); // Refresh roles array
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'An error occurred while deleting the role', 'error');
      },
    });
  } else {
    Swal.fire('Error', 'Please select a role to delete', 'warning');
  }
}

}