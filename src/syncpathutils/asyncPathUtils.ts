import fs from 'fs'
export type SuccessCallback = () => void;
export type ErrorCallback = (err: NodeJS.ErrnoException) => void;
export type Callbacks = { success?: SuccessCallback, error?: ErrorCallback }

export function rm(path: string) { return this.remove(path) }
export function unlink(path: string) { return this.remove(path) }
export function remove(path: string, callbacks?: Callbacks) {
    fs.unlink(path, (err => { solveCallbacks(callbacks, err) }))
}

function solveCallbacks(callbacks: Callbacks, err: NodeJS.ErrnoException) {
    if (!callbacks) return

    if (err && callbacks.error) {
        callbacks.error(err)

        return
    }

    if (!err && callbacks.success) callbacks.success()
}

export function write(path: string, obj: any) { return this.save(path, obj) }
export function save(path: string, obj: any): boolean {
    try {
        if (path.endsWith('.json')) {
            obj = JSON.stringify(obj)
        }

        fs.writeFileSync(path, obj)

        return true
    } catch(err) {
        console.error(err)

        return false
    }
}

export function read<T>(path: string, fallbackValue: any = null, saveIfNotExists: boolean = false): T {
    return this.load(path, fallbackValue, saveIfNotExists)
}
export function load<T>(path: string, fallbackValue: any = null, saveIfNotExists: boolean = false): T {
    if (!this.exists(path)) {
        if (fallbackValue) {
            if (saveIfNotExists) {
                this.save(path, fallbackValue)
            }

            return fallbackValue
        }
    }

    try {
        var obj: any = fs.readFileSync(path)

        if (path.endsWith('.json')) {
            obj = JSON.parse(obj)
        }

        return obj
    } catch(err) {
        console.error(err)

        return fallbackValue
    }
}

export function exists(path: string): boolean {
    return fs.existsSync(path)
}

export function cp(src: string, dest: string) { return this.copy(src, dest) }
export function copy(src: string, dest: string): boolean {
    try {
        fs.copyFileSync(src, dest)
    } catch(err) {
        console.error(err)

        return false
    }

    return this.exists(dest)
}

export function mv(src: string, dest: string) { return this.move(src, dest) }
export function move(src: string, dest: string): boolean {
    try {
        fs.renameSync(src, dest)
    } catch(err) {
        console.error(err)

        return false
    }

    return this.exists(dest)
}

export function mkdir(path: string, recursive = true): boolean {
    try {
        fs.mkdirSync(path, { recursive: recursive })

        return true
    } catch(err) {
        console.log(err)

        return false
    }
}

export function touch(path: string): boolean {
    return this.save(path, null)
}