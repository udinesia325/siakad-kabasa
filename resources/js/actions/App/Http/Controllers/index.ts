import DashboardController from './DashboardController';
import Settings from './Settings';
import AbsensiController from './AbsensiController';
import TahunAjaranController from './TahunAjaranController';
import KelasController from './KelasController';
import SiswaController from './SiswaController';
import PegawaiController from './PegawaiController';
import JadwalAbsensiController from './JadwalAbsensiController';
import HariLiburController from './HariLiburController';
import KehadiranController from './KehadiranController';
import JamPelajaranController from './JamPelajaranController';
import MataPelajaranController from './MataPelajaranController';
import JadwalMengajarController from './JadwalMengajarController';
import UserController from './UserController';

const Controllers = {
    DashboardController: Object.assign(
        DashboardController,
        DashboardController,
    ),
    Settings: Object.assign(Settings, Settings),
    AbsensiController: Object.assign(AbsensiController, AbsensiController),
    TahunAjaranController: Object.assign(
        TahunAjaranController,
        TahunAjaranController,
    ),
    KelasController: Object.assign(KelasController, KelasController),
    SiswaController: Object.assign(SiswaController, SiswaController),
    PegawaiController: Object.assign(PegawaiController, PegawaiController),
    JadwalAbsensiController: Object.assign(
        JadwalAbsensiController,
        JadwalAbsensiController,
    ),
    HariLiburController: Object.assign(
        HariLiburController,
        HariLiburController,
    ),
    KehadiranController: Object.assign(
        KehadiranController,
        KehadiranController,
    ),
    JamPelajaranController: Object.assign(
        JamPelajaranController,
        JamPelajaranController,
    ),
    MataPelajaranController: Object.assign(
        MataPelajaranController,
        MataPelajaranController,
    ),
    JadwalMengajarController: Object.assign(
        JadwalMengajarController,
        JadwalMengajarController,
    ),
    UserController: Object.assign(UserController, UserController),
};

export default Controllers;
