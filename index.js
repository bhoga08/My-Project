const { app } = require('./app'); 
const PORT = 5005; 
const connectDB = require('./src/db/db');

connectDB()
.then(() => {
   app.on("error", (error) => {
      console.log("ERRR", error);
      throw error;
   });

   app.listen(PORT, () => {
      console.log("✅ Server is running at port:", PORT);
   });
})
.catch((err) => {
   console.log("❌ MongoDB Connection failed !!!", err);
});
