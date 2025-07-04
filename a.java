import java.io.*;
import java.util.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        // int t = Integer.parseInt(read.readLine().trim());
        // while (t-- > 0) {
            String[] val = read.readLine().split(" ");
            int n = Integer.parseInt(val[0]);
            int k = Integer.parseInt(val[1]);
            int min = Math.min(n , k);
            out.println(min % 2 == 0 ? "Malvika" : "Akshat");
        // }
        out.close();
        out.flush();
        read.close();
    }
}