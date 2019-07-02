package pl.dmcs.rkotas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.rkotas.model.Contact;
import pl.dmcs.rkotas.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findById(long id);
}
