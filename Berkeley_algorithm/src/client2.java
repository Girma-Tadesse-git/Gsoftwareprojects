import java.io.*;
import java.net.*;
import java.time.*;
import java.time.ZoneId;
import java.time.format.*;
public class client2 {
    public static void main(String[] args) {
        try {
            Socket client2= new Socket("Localhost",3333);
            DataInputStream reader1= new DataInputStream(client2.getInputStream());
            DataOutputStream writer1= new DataOutputStream(client2.getOutputStream());
            long client2time=Instant.now().toEpochMilli();
            System.out.println("my current time is "+Main_sever.timeformatter(client2time));
            writer1.writeLong(client2time);
            long adjusted=reader1.readLong();
            System.out.println("adjustment is by "+Main_sever.timeformatter(adjusted)+" factor");
            client2time+=adjusted;
            System.out.println("adjusted time "+Main_sever.timeformatter(client2time));
            client2.close();


        }catch (Exception e){

            System.out.println(e);
        }


    }
}
