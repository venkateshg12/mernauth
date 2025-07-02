import java.io.*;
import java.util.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            int n = Integer.parseInt(read.readLine().trim());
            String[] vala = read.readLine().split(" ");
            String[] valb = read.readLine().split(" ");
            long[] arra = new long[n];
            long[] arrb = new long[n];
            for(int i = 0;i < n;i++) {
                arra[i] = Long.parseLong(vala[i]);
                arrb[i] = Long.parseLong(valb[i]);
            }
            long minA = Arrays.stream(arra).min().getAsLong();
            long sumB = Arrays.stream(arrb).sum();
            long x = minA * n + sumB;
            
            long minB = Arrays.stream(arrb).min().getAsLong();
            long sumA = Arrays.stream(arra).sum();
            long y = minB * n + sumA;

            out.println(Math.min(x, y));

        }
        out.close();
        out.flush();
        read.close();
    }
}