package app.dto.comment;

public class RemoveCommentData {

    private Long id;


    public RemoveCommentData(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "RemoveCommentData{" +
                "id=" + id +
                '}';
    }
}
