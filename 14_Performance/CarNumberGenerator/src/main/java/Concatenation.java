
public class Concatenation {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();

        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < 20000; i++) {
            builder.append("some text some text some text");
        }
        System.out.println(builder.length());
        System.out.println((System.currentTimeMillis() - start) + " ms");
    }
}
