import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  user: any;
  userSlug: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSlug = this.activatedRoute.snapshot.paramMap.get('slug');

    this.userService.getUser(this.userSlug).subscribe((response) => {
      this.user = response;
      this.editProfileForm.patchValue(response);
    });

    this.editProfileForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(10)]],
      last_name: ['', Validators.required],
      profile_picture: ['', Validators.maxLength(255)],
      phone: ['', Validators.maxLength(12)],
    });
  }

  editProfileData(form: any) {
    this.userService.updateUser(
      this.userSlug,
      this.editProfileForm.value.first_name,
      this.editProfileForm.value.last_name,
      this.editProfileForm.value.phone,
      this.editProfileForm.value.profile_picture
    ).subscribe({
      next: (v) => {
        this.route.navigate(['profile']);
      },
      error: (e) => {
        alert('Editing profile failed, Check your input data!!');
      },
    })
  }
}
