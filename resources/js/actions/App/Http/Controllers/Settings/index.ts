import ProfileController from './ProfileController'
import JenisKelasController from './JenisKelasController'
import SecurityController from './SecurityController'
import WhatsappController from './WhatsappController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    JenisKelasController: Object.assign(JenisKelasController, JenisKelasController),
    SecurityController: Object.assign(SecurityController, SecurityController),
    WhatsappController: Object.assign(WhatsappController, WhatsappController),
}

export default Settings