# Vue

## Vue 3 Composition API

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

const avatar = ref('')
let cropper: HqCropperInstance

onMounted(() => {
    cropper = HqCropper((base64) => {
        avatar.value = base64
    })
})

const openCropper = () => cropper.open()
</script>

<template>
    <div>
        <img v-if="avatar" :src="avatar" alt="Avatar" />
        <button @click="openCropper">Upload Avatar</button>
    </div>
</template>
```

## With Configuration

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HqCropper, type HqCropperInstance, type IState } from 'hq-cropper'

const image = ref('')
const fileName = ref('')
const error = ref<string | null>(null)

let cropper: HqCropperInstance

onMounted(() => {
    cropper = HqCropper(
        (base64, blob, state: IState) => {
            image.value = base64
            fileName.value = state.fileName
            error.value = null
        },
        {
            outputSize: 256,
            type: 'jpeg',
            compression: 0.8,
            maxFileSize: 5 * 1024 * 1024,
        },
        undefined,
        (message) => {
            error.value = message
        }
    )
})
</script>

<template>
    <div class="profile-upload">
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="image" class="preview">
            <img :src="image" alt="Profile" />
            <p>{{ fileName }}</p>
        </div>
        <div v-else class="placeholder">No image selected</div>

        <button @click="cropper.open()">
            {{ image ? 'Change Image' : 'Upload Image' }}
        </button>
    </div>
</template>
```

## Composable

```typescript
// composables/useCropper.ts
import { ref, onMounted, type Ref } from 'vue'
import {
    HqCropper,
    type HqCropperInstance,
    type IConfig,
    type IState,
} from 'hq-cropper'

interface UseCropperReturn {
    image: Ref<string | null>
    blob: Ref<Blob | null>
    state: Ref<IState | null>
    open: () => void
    clear: () => void
}

export function useCropper(
    config?: Partial<IConfig>,
    onError?: (error: string) => void
): UseCropperReturn {
    const image = ref<string | null>(null)
    const blob = ref<Blob | null>(null)
    const state = ref<IState | null>(null)

    let cropper: HqCropperInstance

    onMounted(() => {
        cropper = HqCropper(
            (base64, blobData, stateData) => {
                image.value = base64
                blob.value = blobData
                state.value = stateData
            },
            config,
            undefined,
            onError
        )
    })

    const open = () => cropper?.open()

    const clear = () => {
        image.value = null
        blob.value = null
        state.value = null
    }

    return { image, blob, state, open, clear }
}
```

```vue
<script setup lang="ts">
import { useCropper } from '@/composables/useCropper'

const { image, open, clear } = useCropper({ outputSize: 512 }, (error) =>
    alert(error)
)
</script>

<template>
    <div>
        <img v-if="image" :src="image" alt="" />
        <button @click="open">Select Image</button>
        <button v-if="image" @click="clear">Clear</button>
    </div>
</template>
```

## With Form

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HqCropper, type HqCropperInstance } from 'hq-cropper'

const name = ref('')
const avatar = ref<Blob | null>(null)
const preview = ref('')

let cropper: HqCropperInstance

onMounted(() => {
    cropper = HqCropper(
        (base64, blob) => {
            preview.value = base64
            avatar.value = blob
        },
        { outputSize: 256 }
    )
})

const submit = async () => {
    const formData = new FormData()
    formData.append('name', name.value)
    if (avatar.value) {
        formData.append('avatar', avatar.value, 'avatar.jpg')
    }

    await fetch('/api/register', {
        method: 'POST',
        body: formData,
    })
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="avatar-section">
            <img v-if="preview" :src="preview" alt="Avatar" />
            <button type="button" @click="cropper.open()">Upload Avatar</button>
        </div>

        <input v-model="name" placeholder="Name" />
        <button type="submit">Register</button>
    </form>
</template>
```

## Vue 2 Options API

```vue
<template>
    <div>
        <img v-if="avatar" :src="avatar" alt="Avatar" />
        <button @click="openCropper">Upload</button>
    </div>
</template>

<script>
import { HqCropper } from 'hq-cropper'

export default {
    data() {
        return {
            avatar: '',
            cropper: null,
        }
    },
    mounted() {
        this.cropper = HqCropper(
            (base64) => {
                this.avatar = base64
            },
            {
                outputSize: 256,
            }
        )
    },
    methods: {
        openCropper() {
            this.cropper.open()
        },
    },
}
</script>
```
