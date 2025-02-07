import java.io.*;
import java.net.*;
import java.time.*;

import java.util.Scanner;
public class client {
    public static void main(String[] args)  {
       try{
           Socket s=new Socket ("localhost",3333);
           DataInputStream reader= new DataInputStream(s.getInputStream());
           DataOutputStream output= new DataOutputStream(s.getOutputStream());
           PrintWriter writer= new PrintWriter(output,true);
          int do1 = 0;
           do {
               Scanner input=new Scanner(System.in);
               System.out.println("For synchronizing time  press 1 to close perss any number");
               do1=input.nextInt();
               if (do1==1){
           writer.println("what time is it");
           long T1=Instant.now().toEpochMilli();
           long servertime=reader.readLong();
           long T2=Instant.now().toEpochMilli();
           long delay=(T2-T1)/2;
           long sync=servertime+delay;


           System.out.println("new synced time is "+server.timeformatter(sync));}
           else {
               writer.println("stop");
               break;}
           }while (do1==1);
       }

       catch (Exception e){
           System.out.println(e);
       }

    }
}
