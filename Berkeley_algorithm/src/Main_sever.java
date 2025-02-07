import java.io.*;
import java.net.*;
import java.time.*;
import java.time.ZoneId;
import java.time.format.*;
public class Main_sever {
    public static String timeformatter(long epochMilli) {
        DateTimeFormatter formatter=DateTimeFormatter.ofPattern("HH:mm:ss:SSS")
                .withZone(ZoneId.systemDefault());
        return formatter.format(Instant.ofEpochMilli(epochMilli));
    }
    public static void main(String[] args) {



        try {
            ServerSocket ss = new ServerSocket(3333);
            System.out.println("waiting connection...");
            Socket client1= ss.accept();
            System.out.println("client one has connected successfully");
            Socket client2=ss.accept();
            System.out.println("client one has connected successfully");
            DataInputStream reader1= new DataInputStream(client1.getInputStream());
            DataOutputStream writer1= new DataOutputStream(client1.getOutputStream());
            DataInputStream reader2= new DataInputStream(client2.getInputStream());
            DataOutputStream writer2= new DataOutputStream(client2.getOutputStream());
            long T1=reader1.readLong();
            System.out.println("time from client1 recived "+timeformatter(T1));
            long T2=reader2.readLong();
            System.out.println("time from client2  recived "+timeformatter(T2));
            long servertime=Instant.now().toEpochMilli();
            System.out.println("servertime is "+timeformatter(servertime));
            long avetime=(servertime+T1+T2)/3;
            System.out.println("average time "+Main_sever.timeformatter(avetime));
            long adjustT1=avetime-T1;
            long adjustT2= avetime-T2;
            long adjustserver=avetime-servertime;
            servertime+=adjustserver;
            System.out.println("adjust server time  "+timeformatter(servertime));
            writer1.writeLong(adjustT1);
            writer2.writeLong(adjustT1);


            ss.close();




        } catch (Exception e) {
            System.out.println(e);

        }
    }
}