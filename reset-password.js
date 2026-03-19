const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

// Database path
const dbPath = './.tmp/data.db';

// New password you want to set
const newPassword = 'admin123'; // Change this to your desired password
const email = 'admin@example.com'; // Change if your admin email is different

async function resetPassword() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    
    // Update the admin user password
    db.run(
      `UPDATE administrators SET password = ? WHERE email = ?`,
      [hashedPassword, email],
      function(err) {
        if (err) {
          console.error('Error updating password:', err);
          reject(err);
        } else {
          if (this.changes > 0) {
            console.log(`✅ Password reset successfully for ${email}`);
            console.log(`🔑 New password: ${newPassword}`);
            console.log('🌐 You can now login at: http://localhost:1337/admin');
          } else {
            console.log(`❌ No admin user found with email: ${email}`);
            console.log('📋 Available admin emails:');
            
            // Show available admin emails
            db.all('SELECT email, username FROM administrators', (err, rows) => {
              if (!err && rows.length > 0) {
                rows.forEach(row => {
                  console.log(`   - ${row.email} (${row.username})`);
                });
              }
            });
          }
          resolve();
        }
      }
    );
    
    db.close();
  });
}

// Check if user wants to use custom email/password
const customEmail = process.argv[2];
const customPassword = process.argv[3];

if (customEmail) {
  email = customEmail;
}

if (customPassword) {
  newPassword = customPassword;
}

console.log('🔧 Resetting Strapi Admin Password...');
console.log(`📧 Email: ${email}`);
console.log(`🔑 New Password: ${newPassword}`);
console.log('');

resetPassword().catch(console.error);
