package oslomet.oblig1data1700;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;





@RestController
public class HomeController {
    @GetMapping("/")
    public String ogaboga(){
        return "index";
    }
}
