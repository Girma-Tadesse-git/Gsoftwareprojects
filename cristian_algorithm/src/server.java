import java.io.*;
import java.net.*;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.*;


public class server {
    public static String timeformatter(long epochMilli) {
        DateTimeFormatter formatter=DateTimeFormatter.ofPattern("HH:mm:ss:SSS")
                .withZone(ZoneId.systemDefault());
        return formatter.format(Instant.ofEpochMilli(epochMilli));
    }
    public static void main(String[] args) {
        try{
            ServerSocket ss=new ServerSocket(3333);
            System.out.println("waiting connection...");
            Socket so= ss.accept();
            System.out.println("succefully connected!!");
            DataInputStream reader= new DataInputStream(so.getInputStream());
           DataOutputStream writer= new DataOutputStream(so.getOutputStream());
            String str="";
            while(true){
                str=reader.readLine();
                System.out.println("clientsays "+str);
                if(str.equalsIgnoreCase("what time is it")){
                    long servertime=Instant.now().toEpochMilli();
                    System.out.println("current server time response"+timeformatter(servertime));
                    writer.writeLong(servertime);}
                if (str.equalsIgnoreCase("stop")) {
                    break;
                }
            }
            writer.close();
            so.close();
            ss.close();

        }
        catch (Exception e){
            System.out.println(e);
        }

    }
}