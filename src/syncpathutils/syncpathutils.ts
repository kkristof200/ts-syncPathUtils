import fs from 'fs'

export class SyncPathUtils {
    static rm(path: string) { return this.remove(path) }
    static unlink(path: string) { return this.remove(path) }
    static delete(path: string) { return this.remove(path) }
    static remove(path: string): boolean {
        try {
            fs.unlinkSync(path)

            return true
        } catch(err) {
            console.error(err)

            return false
        }
    }

    static write(path: string, obj: any) { return this.save(path, obj) }
    static save(path: string, obj: any): boolean {
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

    static read<T>(path: string, fallbackValue: any = null, saveIfNotExists: boolean = false): T {
        return this.load(path, fallbackValue, saveIfNotExists)
    }
    static load<T>(path: string, fallbackValue: any = null, saveIfNotExists: boolean = false): T {
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

    static exists(path: string): boolean {
        return fs.existsSync(path)
    }

    static cp(src: string, dest: string) { return this.copy(src, dest) }
    static copy(src: string, dest: string): boolean {
        try {
            fs.copyFileSync(src, dest)
        } catch(err) {
            console.error(err)

            return false
        }

        return this.exists(dest)
    }

    static mv(src: string, dest: string) { return this.move(src, dest) }
    static move(src: string, dest: string): boolean {
        try {
            fs.renameSync(src, dest)
        } catch(err) {
            console.error(err)

            return false
        }

        return this.exists(dest)
    }

    static mkdir(path: string, recursive = true): boolean {
        try {
            fs.mkdirSync(path, { recursive: recursive })

            return true
        } catch(err) {
            console.log(err)

            return false
        }
    }

    static touch(path: string): boolean {
        return this.save(path, null)
    }
}