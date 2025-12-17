# Angular

## Basic Example

```typescript
// avatar-upload.component.ts
import { Component, signal } from '@angular/core'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

@Component({
    selector: 'app-avatar-upload',
    standalone: true,
    template: `
        <div class="avatar-upload">
            @if (avatar()) {
                <img [src]="avatar()" alt="Avatar" />
            }
            <button (click)="openCropper()">Upload Avatar</button>
        </div>
    `,
})
export class AvatarUploadComponent {
    avatar = signal('')
    private cropper: HqCropperInstance

    constructor() {
        this.cropper = HqCropper((base64) => {
            this.avatar.set(base64)
        })
    }

    openCropper() {
        this.cropper.open()
    }
}
```

## With Configuration

```typescript
// profile-picture.component.ts
import { Component, signal } from '@angular/core'
import {
    HqCropper,
    type HqCropperInstance,
    type ApplicationState,
} from 'hq-cropper'

@Component({
    selector: 'app-profile-picture',
    standalone: true,
    template: `
        <div class="profile-picture">
            @if (error()) {
                <div class="error">{{ error() }}</div>
            }

            @if (image()) {
                <div class="preview">
                    <img [src]="image()" alt="Profile" />
                    <p>{{ fileName() }}</p>
                </div>
            } @else {
                <div class="placeholder">No image selected</div>
            }

            <button (click)="openCropper()">
                {{ image() ? 'Change Image' : 'Upload Image' }}
            </button>
        </div>
    `,
})
export class ProfilePictureComponent {
    image = signal('')
    fileName = signal('')
    error = signal<string | null>(null)

    private cropper: HqCropperInstance

    constructor() {
        this.cropper = HqCropper(
            (base64, blob, state: ApplicationState) => {
                this.image.set(base64)
                this.fileName.set(state.fileName)
                this.error.set(null)
            },
            {
                outputSize: 256,
                type: 'jpeg',
                compression: 0.8,
                maxFileSize: 5 * 1024 * 1024,
            },
            undefined,
            (message) => {
                this.error.set(message)
            }
        )
    }

    openCropper() {
        this.cropper.open()
    }
}
```

## Service-based Approach

```typescript
// cropper.service.ts
import { Injectable, signal } from '@angular/core'
import {
    HqCropper,
    type HqCropperInstance,
    type ConfigurationOptions,
    type ClassNames,
    type ApplicationState,
} from 'hq-cropper'

@Injectable({
    providedIn: 'root',
})
export class CropperService {
    private cropper: HqCropperInstance | null = null

    readonly image = signal<string | null>(null)
    readonly blob = signal<Blob | null>(null)
    readonly state = signal<ApplicationState | null>(null)
    readonly error = signal<string | null>(null)

    initialize(
        config?: Partial<ConfigurationOptions>,
        css?: Partial<ClassNames>
    ) {
        this.cropper = HqCropper(
            (base64, blobData, stateData) => {
                this.image.set(base64)
                this.blob.set(blobData)
                this.state.set(stateData)
                this.error.set(null)
            },
            config,
            css,
            (message) => {
                this.error.set(message)
            }
        )
    }

    open() {
        this.cropper?.open()
    }

    clear() {
        this.image.set(null)
        this.blob.set(null)
        this.state.set(null)
    }
}
```

```typescript
// app.component.ts
import { Component, inject, OnInit } from '@angular/core'
import { CropperService } from './cropper.service'

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <div>
            @if (cropperService.image()) {
                <img [src]="cropperService.image()" alt="" />
            }
            <button (click)="cropperService.open()">Select Image</button>
            @if (cropperService.image()) {
                <button (click)="cropperService.clear()">Clear</button>
            }
        </div>
    `,
})
export class AppComponent implements OnInit {
    cropperService = inject(CropperService)

    ngOnInit() {
        this.cropperService.initialize({
            outputSize: 512,
            type: 'png',
        })
    }
}
```

## With Reactive Forms

```typescript
// registration-form.component.ts
import { Component, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

@Component({
    selector: 'app-registration-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="avatar-section">
                @if (preview()) {
                    <img [src]="preview()" alt="Avatar preview" />
                }
                <button type="button" (click)="openCropper()">
                    Upload Avatar
                </button>
            </div>

            <input formControlName="name" placeholder="Name" />
            <input formControlName="email" placeholder="Email" type="email" />

            <button type="submit" [disabled]="form.invalid">Register</button>
        </form>
    `,
})
export class RegistrationFormComponent {
    preview = signal('')
    private avatarBlob: Blob | null = null
    private cropper: HqCropperInstance

    form = inject(FormBuilder).group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    })

    constructor() {
        this.cropper = HqCropper(
            (base64, blob) => {
                this.preview.set(base64)
                this.avatarBlob = blob
            },
            { outputSize: 256 }
        )
    }

    openCropper() {
        this.cropper.open()
    }

    async onSubmit() {
        if (this.form.invalid) return

        const formData = new FormData()
        formData.append('name', this.form.value.name!)
        formData.append('email', this.form.value.email!)

        if (this.avatarBlob) {
            formData.append('avatar', this.avatarBlob, 'avatar.jpg')
        }

        await fetch('/api/register', {
            method: 'POST',
            body: formData,
        })
    }
}
```

## Directive Approach

```typescript
// cropper.directive.ts
import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core'
import {
    HqCropper,
    type HqCropperInstance,
    type ConfigurationOptions,
    type ApplicationState,
} from 'hq-cropper'

@Directive({
    selector: '[appCropper]',
    standalone: true,
})
export class CropperDirective implements OnInit {
    @Input() cropperConfig?: Partial<ConfigurationOptions>
    @Output() imageCropped = new EventEmitter<{
        base64: string
        blob: Blob | null
        state: ApplicationState
    }>()
    @Output() cropperError = new EventEmitter<string>()

    private cropper!: HqCropperInstance

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.cropper = HqCropper(
            (base64, blob, state) => {
                this.imageCropped.emit({ base64, blob, state })
            },
            this.cropperConfig,
            undefined,
            (error) => {
                this.cropperError.emit(error)
            }
        )

        this.el.nativeElement.addEventListener('click', () => {
            this.cropper.open()
        })
    }
}
```

```typescript
// Usage in component
import { Component, signal } from '@angular/core'
import { CropperDirective } from './cropper.directive'

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [CropperDirective],
    template: `
        @if (avatar()) {
            <img [src]="avatar()" alt="Avatar" />
        }
        <button
            appCropper
            [cropperConfig]="{ outputSize: 256 }"
            (imageCropped)="onImageCropped($event)"
            (cropperError)="onError($event)"
        >
            Upload
        </button>
    `,
})
export class ExampleComponent {
    avatar = signal('')

    onImageCropped(event: { base64: string }) {
        this.avatar.set(event.base64)
    }

    onError(message: string) {
        console.error(message)
    }
}
```

## With Angular Material

```typescript
// material-avatar.component.ts
import { Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

@Component({
    selector: 'app-material-avatar',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
    template: `
        <div class="avatar-container">
            @if (avatar()) {
                <img [src]="avatar()" alt="Avatar" class="avatar-image" />
            } @else {
                <div class="avatar-placeholder">
                    <mat-icon>person</mat-icon>
                </div>
            }

            <button mat-fab color="primary" (click)="openCropper()">
                <mat-icon>photo_camera</mat-icon>
            </button>
        </div>
    `,
    styles: [
        `
            .avatar-container {
                position: relative;
                width: 150px;
            }
            .avatar-image,
            .avatar-placeholder {
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
            .avatar-placeholder {
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .avatar-placeholder mat-icon {
                font-size: 64px;
                width: 64px;
                height: 64px;
            }
            button {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        `,
    ],
})
export class MaterialAvatarComponent {
    avatar = signal('')
    private cropper: HqCropperInstance

    private snackBar = inject(MatSnackBar)

    constructor() {
        this.cropper = HqCropper(
            (base64) => {
                this.avatar.set(base64)
                this.snackBar.open('Avatar updated!', 'Close', {
                    duration: 3000,
                })
            },
            {
                outputSize: 256,
                type: 'jpeg',
                compression: 0.9,
            },
            undefined,
            (error) => {
                this.snackBar.open(error, 'Close', { duration: 5000 })
            }
        )
    }

    openCropper() {
        this.cropper.open()
    }
}
```

## NgModule (Non-standalone)

```typescript
// cropper.module.ts
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AvatarUploadComponent } from './avatar-upload.component'

@NgModule({
    declarations: [AvatarUploadComponent],
    imports: [CommonModule],
    exports: [AvatarUploadComponent],
})
export class CropperModule {}
```

```typescript
// avatar-upload.component.ts (non-standalone)
import { Component } from '@angular/core'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

@Component({
    selector: 'app-avatar-upload',
    template: `
        <div>
            <img *ngIf="avatar" [src]="avatar" alt="Avatar" />
            <button (click)="openCropper()">Upload</button>
        </div>
    `,
})
export class AvatarUploadComponent {
    avatar = ''
    private cropper: HqCropperInstance

    constructor() {
        this.cropper = HqCropper((base64) => {
            this.avatar = base64
        })
    }

    openCropper() {
        this.cropper.open()
    }
}
```
