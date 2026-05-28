import ProfileController from './ProfileController'
import SecurityController from './SecurityController'
import WhatsappController from './WhatsappController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    SecurityController: Object.assign(SecurityController, SecurityController),
    WhatsappController: Object.assign(WhatsappController, WhatsappController),
}

export default Settings