<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
class Siswa extends Model
{
    protected $table = 'm_siswa';
    protected $fillable = ['nik', 'nis', 'nama', 'jenis_kelamin', 'email', 'alamat', 'foto', 'kelas_id'];
    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
    public function rfid(): HasOne
    {
        return $this->hasOne(Rfid::class, 'reff_id')->where('reff_type', 'm_siswa');
    }
}
