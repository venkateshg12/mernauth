import java.io.*;
import java.util.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            String[] val = read.readLine().split(" ");
            int n = Integer.parseInt(val[0]);
            int k = Integer.parseInt(val[1]);
            String s = read.readLine().trim();
            int one = 0;
            for(int i = 0;i < n;i++) {
                if(s.charAt(i) == '1'){
                    one++;
                }
            }
            out.println(one <= k || n < 2 * k ? "Alice" : "Bob");
        }
        out.close();
        out.flush();
        read.close();
    }
}