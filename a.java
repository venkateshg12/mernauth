import java.io.*;
import java.util.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            String[] val = read.readLine().split(" ");
            long a = Long.parseLong(val[0]);
            long b = Long.parseLong(val[1]);
            long x = Long.parseLong(val[2]);
            long y = Long.parseLong(val[3]);
            long sum = 0;
            if (a == b) {
                out.println("0");
            } else if (a > b) {
                if (a - 1 == b && a % 2 != 0) {
                    out.println(y);
                }else {
                    out.println(-1);
                }
            } else {
                long p = a;
                while (p < b) {
                    if (p % 2 != 0) {
                        sum += x;
                        p++;
                    } else {
                        sum += Math.min(x, y);
                        p++;
                    }
                }
                out.println(sum);
            }
        }
        out.close();
        out.flush();
        read.close();
    }
}