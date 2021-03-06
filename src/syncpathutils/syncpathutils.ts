import fs from 'fs'

export function rm(path: string) { return remove(path) }
export function unlink(path: string) { return remove(path) }
export function remove(path: string): boolean {
    try {
        fs.unlinkSync(path)

        return true
    } catch(err) {
        console.error(err)

        return false
    }
}

export function write(path: string, obj: any) { return save(path, obj) }
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
    return load(path, fallbackValue, saveIfNotExists)
}
export function load<T>(path: string, fallbackValue: any = null, saveIfNotExists: boolean = false): T {
    if (!exists(path)) {
        if (fallbackValue) {
            if (saveIfNotExists) {
                save(path, fallbackValue)
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

export function cp(src: string, dest: string) { return copy(src, dest) }
export function copy(src: string, dest: string): boolean {
    try {
        fs.copyFileSync(src, dest)
    } catch(err) {
        console.error(err)

        return false
    }

    return exists(dest)
}

export function mv(src: string, dest: string) { return move(src, dest) }
export function move(src: string, dest: string): boolean {
    try {
        fs.renameSync(src, dest)
    } catch(err) {
        console.error(err)

        return false
    }

    return exists(dest)
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
    return save(path, null)
}