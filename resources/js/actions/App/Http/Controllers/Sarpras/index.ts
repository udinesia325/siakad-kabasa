import SarprasDashboardController from './SarprasDashboardController'
import KategoriController from './KategoriController'
import LokasiController from './LokasiController'
import VendorController from './VendorController'
import BarangController from './BarangController'
import PeminjamanController from './PeminjamanController'
import BookingRuanganController from './BookingRuanganController'
import KerusakanController from './KerusakanController'
import MaintenanceController from './MaintenanceController'
import LaporanController from './LaporanController'

const Sarpras = {
    SarprasDashboardController: Object.assign(SarprasDashboardController, SarprasDashboardController),
    KategoriController: Object.assign(KategoriController, KategoriController),
    LokasiController: Object.assign(LokasiController, LokasiController),
    VendorController: Object.assign(VendorController, VendorController),
    BarangController: Object.assign(BarangController, BarangController),
    PeminjamanController: Object.assign(PeminjamanController, PeminjamanController),
    BookingRuanganController: Object.assign(BookingRuanganController, BookingRuanganController),
    KerusakanController: Object.assign(KerusakanController, KerusakanController),
    MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
    LaporanController: Object.assign(LaporanController, LaporanController),
}

export default Sarpras