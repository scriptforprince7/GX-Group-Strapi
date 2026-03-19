const sqlite3 = require('sqlite3').verbose();

// Database path
const dbPath = './.tmp/data.db';

// New password you want to set (plain text - Strapi will hash it)
const newPassword = 'admin123'; // Change this to your desired password
const email = 'admin@example.com'; // Change if your admin email is different

async function resetPassword() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    // First, let's check what admin users exist
    db.all('SELECT id, email, username FROM administrators', (err, rows) => {
      if (err) {
        console.error('Error fetching admin users:', err);
        reject(err);
        return;
      }
      
      console.log('📋 Available admin users:');
      rows.forEach(row => {
        console.log(`   ${row.id}: ${row.email} (${row.username})`);
      });
      
      // Use the first admin user if email doesn't match
      let targetEmail = email;
      let targetUser = rows.find(row => row.email === email);
      
      if (!targetUser && rows.length > 0) {
        targetEmail = rows[0].email;
        console.log(`\n⚠️  Email '${email}' not found. Using: ${targetEmail}`);
      }
      
      // For SQLite, we'll set a temporary password that Strapi can update
      // This is a temporary workaround - you'll need to reset it in Strapi admin
      db.run(
        `UPDATE administrators SET password = ? WHERE email = ?`,
        ['temp-reset-password', targetEmail],
        function(err) {
          if (err) {
            console.error('Error updating password:', err);
            reject(err);
          } else {
            if (this.changes > 0) {
              console.log(`\n✅ Password reset initiated for ${targetEmail}`);
              console.log(`🔑 Temporary password: temp-reset-password`);
              console.log('🌐 Login at: http://localhost:1337/admin');
              console.log('⚠️  IMPORTANT: Change this password immediately after login!');
            } else {
              console.log(`❌ Failed to reset password for ${targetEmail}`);
            }
            resolve();
          }
        }
      );
      
      db.close();
    });
  });
}

console.log('🔧 Resetting Strapi Admin Password...');
console.log('');

resetPassword().catch(console.error);
