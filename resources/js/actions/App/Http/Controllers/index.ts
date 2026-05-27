import DashboardController from './DashboardController'
import Settings from './Settings'
import AbsensiController from './AbsensiController'
import TahunAjaranController from './TahunAjaranController'
import KelasController from './KelasController'
import MasterKelasController from './MasterKelasController'
import TingkatController from './TingkatController'
import SiswaController from './SiswaController'
import PegawaiController from './PegawaiController'
import MataPelajaranController from './MataPelajaranController'
import JamPelajaranController from './JamPelajaranController'
import HariLiburController from './HariLiburController'
import BukuTamuController from './BukuTamuController'
import PpdbController from './PpdbController'
import KehadiranController from './KehadiranController'
import JadwalMengajarController from './JadwalMengajarController'
import JadwalAbsensiController from './JadwalAbsensiController'
import StatistikAbsensiController from './StatistikAbsensiController'
import Wakasis from './Wakasis'
import UserController from './UserController'
import RoleController from './RoleController'
import ServerMonitorController from './ServerMonitorController'
import Publik from './Publik'
import Sarpras from './Sarpras'
import Api from './Api'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    AbsensiController: Object.assign(AbsensiController, AbsensiController),
    TahunAjaranController: Object.assign(TahunAjaranController, TahunAjaranController),
    KelasController: Object.assign(KelasController, KelasController),
    MasterKelasController: Object.assign(MasterKelasController, MasterKelasController),
    TingkatController: Object.assign(TingkatController, TingkatController),
    SiswaController: Object.assign(SiswaController, SiswaController),
    PegawaiController: Object.assign(PegawaiController, PegawaiController),
    MataPelajaranController: Object.assign(MataPelajaranController, MataPelajaranController),
    JamPelajaranController: Object.assign(JamPelajaranController, JamPelajaranController),
    HariLiburController: Object.assign(HariLiburController, HariLiburController),
    BukuTamuController: Object.assign(BukuTamuController, BukuTamuController),
    PpdbController: Object.assign(PpdbController, PpdbController),
    KehadiranController: Object.assign(KehadiranController, KehadiranController),
    JadwalMengajarController: Object.assign(JadwalMengajarController, JadwalMengajarController),
    JadwalAbsensiController: Object.assign(JadwalAbsensiController, JadwalAbsensiController),
    StatistikAbsensiController: Object.assign(StatistikAbsensiController, StatistikAbsensiController),
    Wakasis: Object.assign(Wakasis, Wakasis),
    UserController: Object.assign(UserController, UserController),
    RoleController: Object.assign(RoleController, RoleController),
    ServerMonitorController: Object.assign(ServerMonitorController, ServerMonitorController),
    Publik: Object.assign(Publik, Publik),
    Sarpras: Object.assign(Sarpras, Sarpras),
    Api: Object.assign(Api, Api),
}

export default Controllers