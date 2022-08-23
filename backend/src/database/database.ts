import mongooose, { ConnectOptions } from "mongoose";
import config from "../config";

const connectDatabase = async () => {
  try {
    const mongooseOption: ConnectOptions = {
      //url:config.MONGO_URL,
    };
    const connect = await mongooose.connect(
      `${config.MONGO_URL}`,
      mongooseOption
    );
    console.log('database connected');
    
  } catch (error) {
    console.log(`ERROR ${error}`);
    process.exit(1);
  }
};

export default connectDatabase;