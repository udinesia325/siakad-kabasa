import DashboardController from './DashboardController'
import Settings from './Settings'
import AbsensiController from './AbsensiController'
import TahunAjaranController from './TahunAjaranController'
import KelasController from './KelasController'
import SiswaController from './SiswaController'
import PegawaiController from './PegawaiController'
import MataPelajaranController from './MataPelajaranController'
import JamPelajaranController from './JamPelajaranController'
import HariLiburController from './HariLiburController'
import KehadiranController from './KehadiranController'
import JadwalMengajarController from './JadwalMengajarController'
import JadwalAbsensiController from './JadwalAbsensiController'
import UserController from './UserController'
import RoleController from './RoleController'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    AbsensiController: Object.assign(AbsensiController, AbsensiController),
    TahunAjaranController: Object.assign(TahunAjaranController, TahunAjaranController),
    KelasController: Object.assign(KelasController, KelasController),
    SiswaController: Object.assign(SiswaController, SiswaController),
    PegawaiController: Object.assign(PegawaiController, PegawaiController),
    MataPelajaranController: Object.assign(MataPelajaranController, MataPelajaranController),
    JamPelajaranController: Object.assign(JamPelajaranController, JamPelajaranController),
    HariLiburController: Object.assign(HariLiburController, HariLiburController),
    KehadiranController: Object.assign(KehadiranController, KehadiranController),
    JadwalMengajarController: Object.assign(JadwalMengajarController, JadwalMengajarController),
    JadwalAbsensiController: Object.assign(JadwalAbsensiController, JadwalAbsensiController),
    UserController: Object.assign(UserController, UserController),
    RoleController: Object.assign(RoleController, RoleController),
}

export default Controllers