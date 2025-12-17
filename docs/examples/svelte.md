# Svelte

## Basic Example

```svelte
<!-- AvatarUpload.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance } from 'hq-cropper'

    let avatar = $state('')
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper((base64) => {
            avatar = base64
        })
    })
</script>

<div>
    {#if avatar}
        <img src={avatar} alt="Avatar" />
    {/if}
    <button onclick={() => cropper.open()}>Upload Avatar</button>
</div>
```

## With Configuration

```svelte
<!-- ProfilePicture.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance, type ApplicationState } from 'hq-cropper'

    let image = $state('')
    let fileName = $state('')
    let error = $state<string | null>(null)
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper(
            (base64, blob, state: ApplicationState) => {
                image = base64
                fileName = state.fileName
                error = null
            },
            {
                outputSize: 256,
                type: 'jpeg',
                compression: 0.8,
                maxFileSize: 5 * 1024 * 1024,
            },
            undefined,
            (message) => {
                error = message
            }
        )
    })
</script>

<div class="profile-picture">
    {#if error}
        <div class="error">{error}</div>
    {/if}

    {#if image}
        <div class="preview">
            <img src={image} alt="Profile" />
            <p>{fileName}</p>
        </div>
    {:else}
        <div class="placeholder">No image selected</div>
    {/if}

    <button onclick={() => cropper.open()}>
        {image ? 'Change Image' : 'Upload Image'}
    </button>
</div>
```

## Store-based Approach

```typescript
// stores/cropper.svelte.ts
import {
    HqCropper,
    type HqCropperInstance,
    type ConfigurationOptions,
    type ApplicationState,
} from 'hq-cropper'

function createCropperStore(config?: Partial<ConfigurationOptions>) {
    let image = $state<string | null>(null)
    let blob = $state<Blob | null>(null)
    let state = $state<ApplicationState | null>(null)
    let error = $state<string | null>(null)
    let cropper: HqCropperInstance | null = null

    function init() {
        cropper = HqCropper(
            (base64, blobData, stateData) => {
                image = base64
                blob = blobData
                state = stateData
                error = null
            },
            config,
            undefined,
            (message) => {
                error = message
            }
        )
    }

    function open() {
        cropper?.open()
    }

    function clear() {
        image = null
        blob = null
        state = null
    }

    return {
        get image() {
            return image
        },
        get blob() {
            return blob
        },
        get state() {
            return state
        },
        get error() {
            return error
        },
        init,
        open,
        clear,
    }
}

export const cropperStore = createCropperStore({ outputSize: 512 })
```

```svelte
<!-- App.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { cropperStore } from './stores/cropper.svelte'

    onMount(() => {
        cropperStore.init()
    })
</script>

<div>
    {#if cropperStore.image}
        <img src={cropperStore.image} alt="" />
    {/if}
    <button onclick={() => cropperStore.open()}>Select Image</button>
    {#if cropperStore.image}
        <button onclick={() => cropperStore.clear()}>Clear</button>
    {/if}
</div>
```

## With Form Submission

```svelte
<!-- RegistrationForm.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance } from 'hq-cropper'

    let name = $state('')
    let email = $state('')
    let preview = $state('')
    let avatarBlob: Blob | null = null
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper(
            (base64, blob) => {
                preview = base64
                avatarBlob = blob
            },
            { outputSize: 256 }
        )
    })

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)

        if (avatarBlob) {
            formData.append('avatar', avatarBlob, 'avatar.jpg')
        }

        await fetch('/api/register', {
            method: 'POST',
            body: formData,
        })
    }
</script>

<form onsubmit={handleSubmit}>
    <div class="avatar-section">
        {#if preview}
            <img src={preview} alt="Avatar preview" />
        {/if}
        <button type="button" onclick={() => cropper.open()}>
            Upload Avatar
        </button>
    </div>

    <input bind:value={name} placeholder="Name" required />
    <input bind:value={email} type="email" placeholder="Email" required />

    <button type="submit">Register</button>
</form>
```

## Reusable Component

```svelte
<!-- ImageCropper.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import {
        HqCropper,
        type HqCropperInstance,
        type ConfigurationOptions,
        type ClassNames,
        type ApplicationState,
    } from 'hq-cropper'

    interface Props {
        config?: Partial<ConfigurationOptions>
        css?: Partial<ClassNames>
        onCrop?: (base64: string, blob: Blob | null, state: ApplicationState) => void
        onError?: (error: string) => void
    }

    let { config, css, onCrop, onError }: Props = $props()

    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper(
            (base64, blob, state) => {
                onCrop?.(base64, blob, state)
            },
            config,
            css,
            onError
        )
    })

    export function open() {
        cropper.open()
    }
</script>

<button onclick={() => cropper.open()}>
    <slot>Select Image</slot>
</button>
```

```svelte
<!-- Usage -->
<script lang="ts">
    import ImageCropper from './ImageCropper.svelte'

    let avatar = $state('')
    let cropperRef: ImageCropper

    function handleCrop(base64: string) {
        avatar = base64
    }
</script>

<div>
    {#if avatar}
        <img src={avatar} alt="Avatar" />
    {/if}

    <ImageCropper
        bind:this={cropperRef}
        config={{ outputSize: 256, type: 'jpeg' }}
        onCrop={handleCrop}
        onError={(e) => alert(e)}
    >
        Upload Avatar
    </ImageCropper>

    <!-- Or trigger programmatically -->
    <button onclick={() => cropperRef.open()}>
        Open Cropper
    </button>
</div>
```

## Action-based Approach

```typescript
// actions/cropper.ts
import {
    HqCropper,
    type HqCropperInstance,
    type ConfigurationOptions,
    type ApplicationState,
} from 'hq-cropper'

interface CropperParams {
    config?: Partial<ConfigurationOptions>
    onCrop: (base64: string, blob: Blob | null, state: ApplicationState) => void
    onError?: (error: string) => void
}

export function cropper(node: HTMLElement, params: CropperParams) {
    let instance: HqCropperInstance

    function init(params: CropperParams) {
        instance = HqCropper(
            params.onCrop,
            params.config,
            undefined,
            params.onError
        )
    }

    function handleClick() {
        instance.open()
    }

    init(params)
    node.addEventListener('click', handleClick)

    return {
        update(newParams: CropperParams) {
            init(newParams)
        },
        destroy() {
            node.removeEventListener('click', handleClick)
        },
    }
}
```

```svelte
<!-- Usage with action -->
<script lang="ts">
    import { cropper } from './actions/cropper'

    let avatar = $state('')
</script>

<div>
    {#if avatar}
        <img src={avatar} alt="" />
    {/if}

    <button
        use:cropper={{
            config: { outputSize: 512 },
            onCrop: (base64) => avatar = base64,
            onError: (e) => console.error(e)
        }}
    >
        Upload
    </button>
</div>
```

## With Tailwind CSS

```svelte
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance } from 'hq-cropper'

    let image = $state('')
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper(
            (base64) => image = base64,
            { outputSize: 256 },
            {
                container: ['rounded-xl', 'shadow-2xl'],
                header: ['bg-gray-100', 'text-gray-800'],
                applyButton: [
                    'bg-blue-500',
                    'hover:bg-blue-600',
                    'text-white',
                    'px-4',
                    'py-2',
                    'rounded-lg',
                ],
                cancelButton: [
                    'bg-gray-200',
                    'hover:bg-gray-300',
                    'text-gray-700',
                    'px-4',
                    'py-2',
                    'rounded-lg',
                ],
            }
        )
    })
</script>

<div class="flex flex-col items-center gap-4">
    {#if image}
        <img src={image} alt="Cropped" class="w-32 h-32 rounded-full" />
    {/if}
    <button
        onclick={() => cropper.open()}
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
        Upload
    </button>
</div>
```

## SvelteKit Integration

```svelte
<!-- routes/profile/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance } from 'hq-cropper'
    import { enhance } from '$app/forms'

    let preview = $state('')
    let avatarBlob: Blob | null = null
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper(
            (base64, blob) => {
                preview = base64
                avatarBlob = blob
            },
            { outputSize: 256 }
        )
    })

    function handleSubmit() {
        return async ({ formData }: { formData: FormData }) => {
            if (avatarBlob) {
                formData.append('avatar', avatarBlob, 'avatar.jpg')
            }
        }
    }
</script>

<form method="POST" use:enhance={handleSubmit}>
    <div class="avatar-section">
        {#if preview}
            <img src={preview} alt="Avatar" />
        {/if}
        <button type="button" onclick={() => cropper.open()}>
            Change Avatar
        </button>
    </div>

    <input name="name" placeholder="Name" required />

    <button type="submit">Update Profile</button>
</form>
```

## Legacy Svelte 4 Syntax

```svelte
<!-- Svelte 4 -->
<script lang="ts">
    import { onMount } from 'svelte'
    import { HqCropper, type HqCropperInstance } from 'hq-cropper'

    let avatar = ''
    let cropper: HqCropperInstance

    onMount(() => {
        cropper = HqCropper((base64) => {
            avatar = base64
        })
    })
</script>

<div>
    {#if avatar}
        <img src={avatar} alt="Avatar" />
    {/if}
    <button on:click={() => cropper.open()}>Upload Avatar</button>
</div>
```
