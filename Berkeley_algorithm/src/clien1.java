import java.io.*;
import java.net.*;
import java.time.*;
import java.time.ZoneId;
import java.time.format.*;
public class clien1 {
    public static void main(String[] args) {
        try {
            Socket client1= new Socket("Localhost",3333);
            DataInputStream reader1= new DataInputStream(client1.getInputStream());
            DataOutputStream writer1= new DataOutputStream(client1.getOutputStream());
            long client1time=Instant.now().toEpochMilli();
            System.out.println("my current time is "+ Main_sever.timeformatter(client1time));
            writer1.writeLong(client1time);
            long adjusted=reader1.readLong();
            System.out.println("adjustment is by "+Main_sever.timeformatter(adjusted)+" factor");
            client1time+=adjusted;
            System.out.println("adjusted time "+Main_sever.timeformatter(client1time));
            client1.close();


        }catch (Exception e){

            System.out.println(e);
        }



    }
}
