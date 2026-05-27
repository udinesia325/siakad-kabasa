import ProfileController from './ProfileController'
import JenisKelasController from './JenisKelasController'
import SecurityController from './SecurityController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    JenisKelasController: Object.assign(JenisKelasController, JenisKelasController),
    SecurityController: Object.assign(SecurityController, SecurityController),
}

export default Settings