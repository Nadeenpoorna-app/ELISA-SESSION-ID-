const mega = require("megajs");

const accounts = [
  {
    email: 'nadeenpoornagit@gmail.com',
    password: 'Nadeen@123',
    userAgent: 'Mozilla/5.0 ...'
  },
    {
    email: 'nadeenpoornagit@gmail.com',
    password: 'Nadeen@123',
    userAgent: 'Mozilla/5.0 ...'
  }
];

function getRandomAccount() {
  const index = Math.floor(Math.random() * accounts.length);
  return accounts[index];
}

const upload = (data, name) => {
  return new Promise((resolve, reject) => {
    try {
      const auth = getRandomAccount();

      if (!auth.email || !auth.password || !auth.userAgent) {
        throw new Error("Missing required authentication fields");
      }

      console.log("Using auth:", auth.email); // Optional: For debugging

      const storage = new mega.Storage(auth, () => {
        const uploader = storage.upload({ name: name, allowUploadBuffering: true });
        data.pipe(uploader);
        
        storage.on("add", (file) => {
          file.link((err, url) => {
            if (err) {
              reject(err);
              return;
            }
            storage.close();
            resolve(url);
          });
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { upload };

