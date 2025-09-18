package com.pl.premier_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/player")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name, // Ovo je ispravno
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation) {

        System.out.println("Received params - name: " + name + ", position: " + position + ", team: " + team + ", nation: " + nation);

        // Kombinovana pretraga umesto if/else if
        List<Player> filteredPlayers = playerService.getPlayers();

        if (name != null && !name.trim().isEmpty()) {
            System.out.println("Filtering by name: " + name);
            filteredPlayers = filteredPlayers.stream()
                    .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (position != null && !position.trim().isEmpty()) {
            System.out.println("Filtering by position: " + position);
            filteredPlayers = filteredPlayers.stream()
                    .filter(p -> p.getPos().equalsIgnoreCase(position))
                    .collect(Collectors.toList());
        }

        if (team != null && !team.trim().isEmpty()) {
            System.out.println("Filtering by team: " + team);
            filteredPlayers = filteredPlayers.stream()
                    .filter(p -> p.getTeam().equalsIgnoreCase(team))
                    .collect(Collectors.toList());
        }

        if (nation != null && !nation.trim().isEmpty()) {
            System.out.println("Filtering by nation: " + nation);
            filteredPlayers = filteredPlayers.stream()
                    .filter(p -> p.getNation().equalsIgnoreCase(nation))
                    .collect(Collectors.toList());
        }

        return filteredPlayers;
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player){
        Player createdPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player){
        Player resultPlayer = playerService.updatePlayer(player);
        if(resultPlayer != null){
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName){
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("Player deleted", HttpStatus.OK);
    }
}
