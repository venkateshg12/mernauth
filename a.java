import java.io.*;
import java.util.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            int n = Integer.parseInt(read.readLine().trim());
            String[] val = read.readLine().split(" ");
            int[] arr = new int[n];
            int[] c = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(val[i]);
                c[i] = Integer.parseInt(val[i]);
            }
            Arrays.sort(c);
            int k = 0;
            for (int i = 0; i < n; i++) {
                if (arr[i] == c[i]) {
                    k++;
                }
            }
            if (k == n) {
                out.println("NO");
            } else {
                out.println("YES");
                out.println(n - k);
                for (int i = 0; i < n; i++) {
                    if(arr[i] != c[i]){
                        out.print(arr[i] + " ");
                    }
                }
                out.println();
            }
        }
        out.close();
        out.flush();
        read.close();
    }
}