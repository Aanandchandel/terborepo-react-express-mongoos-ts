import app from "./config/serverconfig";
import authRoutes from "./apis/userApi/routes/auth.routes"
// configer routes here
app.use('/api/auth', authRoutes);

export default app;